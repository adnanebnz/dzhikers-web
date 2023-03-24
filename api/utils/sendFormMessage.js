const { createMailTransporter } = require("./createMailTransporter");

const sendMessage = async (email, content) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: email,
    to: "admin@dzhikers.live",
    subject: "Contact message",
    html: `<p>${content}</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
