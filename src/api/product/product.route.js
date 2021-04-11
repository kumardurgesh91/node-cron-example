const express = require('express');
const controller = require('./product.controller');
const Auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', Auth.verifyToken, controller.get);
router.post('/create', Auth.verifyToken, controller.create);
router.post('/queue', Auth.verifyToken, controller.queue);
router.post('/zone', Auth.verifyToken, controller.zone);

module.exports = router;
