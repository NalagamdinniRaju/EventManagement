const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEventRegistrationEmail = async (userEmail, event) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: `Registered for ${event.name}`,
      html: `
        <h1>Event Registration Confirmation</h1>
        <p>You have successfully registered for ${event.name}.</p>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>We look forward to seeing you there!</p>
      `
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};