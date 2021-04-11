const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const middlewares = require('./middlewares/app_middlewares');
const api = require('./api');
const scheduler = require('./scheduler');

const app = express();
// const db = require('./models');
// db.sequelize.sync();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Running!!',
  });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

scheduler.runSchedule();
scheduler.watchSetting();

module.exports = app;
