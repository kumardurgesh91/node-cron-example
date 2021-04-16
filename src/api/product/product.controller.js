const db = require('../../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const products = await db.Product.findAll();
      return res.send({ success: true, products });
    } catch (e) {
      return next(e);
    }
  },

  getNonProcessedProducts: async (req, res, next) => {
    try {
      const products = await db.Product.findAll({
        where: { is_processed: false },
      });
      return res.send({ success: true, products });
    } catch (e) {
      return next(e);
    }
  },

  create: async (req, res, next) => {
    try {
      const { product_value } = req.body;
      const product = await db.Product.create({ product_value });
      return res.send({ success: true, product });
    } catch (e) {
      return next(e);
    }
  },

  queue: async (req, res, next) => {
    try {
      const { products } = req.body;
      const queueProducts = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const product of products) {
        queueProducts.push({
          product_value: product.product_value,
          product_code: product.product_code,
        });
      }
      await db.ProductQueue.bulkCreate(queueProducts);
      return res.send({ success: true });
    } catch (e) {
      return next(e);
    }
  },

  zone: async (req, res, next) => {
    const transaction = await db.sequelize.transaction();
    try {
      const productQueue = await db.ProductQueue.findAll();
      const productRegion = [];
      const productCodeIds = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const product of productQueue) {
        productRegion.push({
          zone: product.product_value > 50 ? 'Zone 1' : 'Zone 2',
          product_code: product.product_code,
        });
        productCodeIds.push(product.product_code);
      }
      await db.ProductRegion.bulkCreate(productRegion);
      await db.ProductQueue.destroy({
        where: { product_code: productCodeIds },
      });
      await db.Product.update(
        { is_processed: true },
        { where: { product_code: productCodeIds } }
      );
      await transaction.commit();
      return res.send({ success: true, productQueue });
    } catch (e) {
      await transaction.rollback();
      return next(e);
    }
  },
};
