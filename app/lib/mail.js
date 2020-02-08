var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  service: '',
  auth: {
    user: '',
    pass: ''
  }
});

module.exports = smtpTransport;
