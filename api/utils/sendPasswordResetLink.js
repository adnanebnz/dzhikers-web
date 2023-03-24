const { createMailTransporter } = require("./createMailTransporter");
const sendPasswordResetLink = async (email, link) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: "admin@dzhikers.live",
    to: email,
    subject: "Lien de réinitialisation de mot de passe",
    html: `<p>Clickez sur ce lien pour réinitialiser votre mot de passe: </p>
    <a href="${link}">Réinitialiser votre mot de passe</a>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendPasswordResetLink };
