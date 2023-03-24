const nodemailer = require("nodemailer");

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: {
      user: "admin@dzhikers.live",
      pass: "adnane20026",
    },
  });
  return transporter;
};

module.exports = { createMailTransporter };
