const db = require('../../models');
const hashService = require('../../services/hash.service');
const commonService = require('../../services/common.service');
const Auth = require('../../middlewares/auth');

module.exports = {
  login: async (req, res, next) => {
    try {
      try {
        const { email, password } = req.body;

        const blank = await commonService.checkBlank({ email, password });
        if (blank && !blank.success) {
          return res.send({ success: false, message: blank.message });
        }
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
          return res.send({
            success: false,
            message: 'Invalid email or password',
          });
        }
        const isPasswordMatched = await hashService.comparePassword(
          password,
          user.hash
        );
        if (!isPasswordMatched) {
          return res.send({
            success: false,
            message: 'Invalid email or password',
          });
        }
        const token = await Auth.createToken(user.id);
        return res.send({
          success: true,
          user,
          token,
        });
      } catch (e) {
        return next(e);
      }
    } catch (e) {
      return next(e);
    }
  },

  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const blank = await commonService.checkBlank({ email, password });
      if (blank && !blank.success) {
        return res.send({ success: false, message: blank.message });
      }
      let user = await db.User.findOne({ where: { email } });
      if (user) {
        return res.send({ success: false, message: 'email already exist' });
      }
      const hash = await hashService.encryptPassword(password);
      user = await db.User.create({ email, hash });

      return res.send({ success: true, user });
    } catch (e) {
      return next(e);
    }
  },
};
