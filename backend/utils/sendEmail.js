const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = new nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      password: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
