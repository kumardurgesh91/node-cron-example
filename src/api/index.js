const express = require('express');

const router = express.Router();
const productRoutes = require('./product/product.route');
const authRoutes = require('./auth/auth.route');

router.get('/', (req, res) => {
  res.json({
    message: 'API - Running!!',
  });
});

router.use('/auth', authRoutes);
router.use('/products', productRoutes);

module.exports = router;
