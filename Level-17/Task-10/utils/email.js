const nodemailer = require('nodemailer');

exports.sendResetEmail = async (to, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const resetUrl = `${process.env.CLIENT_URL}/reset/${token}`;

const mailOptions = {
    from: `"Auth App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset Token',
    text: `You requested a password reset. Here is your reset token:\n\n${token}\n\nUse this token to reset your password. If you did not request this, please ignore this email.`
  };
  

  await transporter.sendMail(mailOptions);
};
