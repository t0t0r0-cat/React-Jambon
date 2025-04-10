import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import 'altcha';

// Load environment variables from .env file
dotenv.config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));

// Function to log messages to a file
const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile('server.log', logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};

// Route to handle the root URL
app.get('/', (req, res) => {
  logToFile('GET / - Root URL accessed');
  res.send('Welcome to the Éco de l\'île server! The API is running.');
});

// Route to handle form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Log the form submission
  logToFile(`POST /api/contact - Form submission received: Name=${name}, Email=${email}, Message=${message}`);

  // Save the data to a file
  const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
  fs.appendFile('contact_messages.txt', data, (err) => {
    if (err) {
      console.error('Error saving message to file:', err);
      logToFile(`Error saving message to file: ${err.message}`);
      return res.status(500).json({ message: 'Failed to save message.' });
    }

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS, // Use environment variable
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Use environment variable
      to: email, // Send verification email to the user
      subject: 'Confirmation de réception de votre message',
      text: `Bonjour ${name},\n\nNous avons bien reçu votre message :\n"${message}"\n\nMerci de nous avoir contactés !\n\nCordialement,\nL'équipe Éco de l'île`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        logToFile(`Error sending email: ${error.message}`);
        return res.status(500).json({ message: `Failed to send verification email: ${error.message}` });
      }

      console.log('Email sent:', info.response);
      logToFile(`Email sent successfully to ${email}: ${info.response}`);
      res.status(200).json({ message: 'Message received and email sent successfully!' });
    });
  });
});

// Fallback for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  const startMessage = `Server is running on http://localhost:${PORT}`;
  console.log(startMessage);
  logToFile(startMessage);
});