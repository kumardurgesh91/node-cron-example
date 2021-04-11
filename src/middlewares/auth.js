const jwt = require('jsonwebtoken');
const db = require('../models');

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization missing',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Authorization',
      });
    }

    const user = await db.User.findOne({ where: { id: decoded } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Authorization',
      });
    }
    req.user = user;

    return next();
  } catch (e) {
    console.log('err', e);
    return res
      .status(401)
      .json({ success: false, message: 'could not authorize' });
  }
}

async function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
