const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
  service: '',
  auth: {
    user: '',
    pass: ''
  }
});

const sendMail = (template, data) => {
  try {
    const newEmail = template(data)
    smtpTransport.sendMail(newEmail)
  } catch (err) {
    throw err
  }
}

module.exports = sendMail
