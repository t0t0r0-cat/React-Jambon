import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail's SMTP server
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'recipient@example.com', // Replace with a test email address
  subject: 'Test Email',
  text: 'This is a test email from Nodemailer using Outlook.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});

// Debug environment variables
console.log(`EMAIL_USER=${process.env.EMAIL_USER}`);
console.log(`EMAIL_PASS=${process.env.EMAIL_PASS}`);