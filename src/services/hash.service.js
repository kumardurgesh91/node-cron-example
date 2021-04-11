const bcrypt = require('bcrypt');

async function encryptPassword(password) {
  return new Promise((res, rej) => {
    // eslint-disable-next-line consistent-return
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return rej(err);
      }
      bcrypt.hash(password, salt, (e, hash) => {
        if (e) {
          rej(err);
        }
        return res(hash);
      });
    });
  });
}

async function comparePassword(plainPass, hash) {
  return new Promise((res, rej) => {
    bcrypt.compare(plainPass, hash, (err, isPasswordMatch) => {
      if (err) {
        return rej(err);
      }
      return res(isPasswordMatch);
    });
  });
}

module.exports = { comparePassword, encryptPassword };
