const Sequelize = require('sequelize');
const dbConfig = require('../config/db.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: dbConfig.define,
  logging: false,
  dialectOptions: {
    connectTimeout: 60000
  }
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User.js')(sequelize, Sequelize);
db.Product = require('./Product.js')(sequelize, Sequelize);
db.ProductQueue = require('./ProductQueue.js')(sequelize, Sequelize);
db.ProductRegion = require('./ProductRegion.js')(sequelize, Sequelize);

module.exports = db;
