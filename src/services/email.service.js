const nodemailer = require('nodemailer');
const settings = require('../config/settings');
// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text) {
  const smpt = (await settings.getSetting()).settings.smtp;
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: smpt.email,
      pass: smpt.password,
    },
  });

  await transporter.sendMail({
    from: '"Durgesh Kumar <kumardurgeshpatel@gmail.com>',
    to,
    subject,
    text,
    html: text,
  });
}

module.exports = sendMail;
