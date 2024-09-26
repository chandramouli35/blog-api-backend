// config/mail.js
const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587, // or 2525
  auth: {
    user: process.env.MAILTRAP_USER, // Your Mailtrap username
    pass: process.env.MAILTRAP_PASS, // Your Mailtrap password
  },
});

module.exports = transporter;
