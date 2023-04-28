const nodemailer = require("nodemailer");

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "benzerdjebadnane13@gmail.com",
      pass: "ftflxbzxxzidcbis",
    },
  });
  return transporter;
};

module.exports = { createMailTransporter };
