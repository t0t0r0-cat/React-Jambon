import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Save the data to a file
  const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
  fs.appendFile('contact_messages.txt', data, (err) => {
    if (err) {
      console.error('Error saving message to file:', err);
      return res.status(500).json({ message: 'Failed to save message.' });
    }

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password or app password
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your email
      to: email, // Send verification email to the user
      subject: 'Confirmation de réception de votre message',
      text: `Bonjour ${name},\n\nNous avons bien reçu votre message :\n"${message}"\n\nMerci de nous avoir contactés !\n\nCordialement,\nL'équipe Éco de l'île`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send verification email.' });
      }

      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Message received and email sent successfully!' });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});