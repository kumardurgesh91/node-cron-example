const express = require('express');

const router = express.Router();
const product_routes = require('./product/product.route');

router.get('/', (req, res) => {
  res.json({
    message: 'API - Running!!',
  });
});

router.use('/products', product_routes);

module.exports = router;
