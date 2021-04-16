const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { QueryTypes } = require('sequelize');
const settings = require('./config/settings');
const log = require('./services/log.service');
const sendMail = require('./services/email.service');
const db = require('./models');

class Schedular {
  constructor() {
    this.task = null;
  }

  // eslint-disable-next-line class-methods-use-this
  async getProductRegionDataToMail() {
    const zoneData = db.sequelize.query(
      'SELECT pr.*, p.product_value FROM products_regions pr, products p where pr.product_code=p.product_code',
      {
        type: QueryTypes.SELECT,
      }
    );
    return zoneData;
  }

  async syncProducts() {
    if (!this.task) {
      log.info('task not running!!');
    }
    try {
      const loginCred = (await settings.getSetting()).settings.login;
      if (!loginCred || !loginCred.email || !loginCred.password) {
        throw new Error('could not async products, cred missing in xml');
      }

      const loginResponse = await axios.post(
        `${process.env.APP_URL}/api/auth/login`,
        {
          email: loginCred.email,
          password: loginCred.password,
        }
      );
      if (loginResponse.data.success !== true) {
        throw new Error(
          `Invalid credentials${JSON.stringify(loginResponse.data)}`
        );
      }

      const { token, user } = loginResponse.data;
      log.info(`Auth User ${JSON.stringify(user)}`);

      const productResponse = await axios.get(
        `${process.env.APP_URL}/api/products/to-process`,
        {
          headers: { authorization: token },
        }
      );
      if (productResponse.data.success !== true) {
        throw new Error(
          `Error get product ${JSON.stringify(productResponse.data)}`
        );
      }

      if (productResponse.data.products.length === 0) {
        throw new Error('No data found');
      }

      const queueResponse = await axios.post(
        `${process.env.APP_URL}/api/products/queue`,
        { products: productResponse.data.products },
        {
          headers: { authorization: token },
        }
      );
      if (queueResponse.data.success !== true) {
        throw new Error(
          `Error queue product ${JSON.stringify(productResponse.data)}`
        );
      }

      const zoneResponse = await axios.post(
        `${process.env.APP_URL}/api/products/zone`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (zoneResponse.data.success !== true) {
        throw new Error(`Error zone ${JSON.stringify(productResponse.data)}`);
      }
      log.info('Sync completed Successfully!!');
      const productRegions = await this.getProductRegionDataToMail();
      let emailHtml = `<h1>${zoneResponse.data.productQueue.length} products added to zone</h1>
      <table border="1px"><tr><td>Product Queue Id</td><td>Product Code</td><td>Product Value</td></tr>`;

      // eslint-disable-next-line no-restricted-syntax
      for (const prod of productRegions) {
        emailHtml += `<tr><td>${prod.product_code}</td><td>${prod.product_value}</td><td>${prod.zone}</td></tr>`;
      }

      emailHtml += '</table>';

      sendMail(loginCred.email, 'POC Report', emailHtml).catch(log.error);
    } catch (e) {
      log.error(e.message);
    }
  }

  async killScheduler() {
    if (this.task) {
      this.task.stop();
      this.task = null;
    }
  }

  async runSchedule() {
    if (this.task) {
      console.log('task already running');
      return this.task;
    }
    try {
      const setting = await settings.getSetting();
      this.task = cron.schedule(
        setting.settings.schedule,
        async () => {
          await this.syncProducts();
        },
        {
          scheduled: false,
        }
      );
      this.task.start();
    } catch (e) {
      console.log(e);
    }
    return this.task;
  }

  async watchSetting() {
    fs.watch(
      path.join(__dirname, './settings.xml'),
      async (event, filename) => {
        if (filename && event === 'change') {
          console.log(`${filename} file Changed`);
          await this.killScheduler();
          this.runSchedule();
        }
      }
    );
  }
}

module.exports = new Schedular();
