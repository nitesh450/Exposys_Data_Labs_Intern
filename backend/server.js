const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');
  const validEmails = [];
  const invalidEmails = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  lines.forEach((line) => {
    const email = line.trim();
    if (emailRegex.test(email)) {
      validEmails.push(email);
    } else {
      invalidEmails.push(email);
    }
  });

  fs.unlinkSync(filePath);

  res.json({ validEmails, invalidEmails });
});

app.post('/send-emails', async (req, res) => {
  const { emails, subject, message, recipient } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'niteshv969@gmail.com',
      pass: 'Nitesh8824@',
    },
  });

  // Create a file with valid emails
  const fileName = 'valid_emails.txt';
  fs.writeFileSync(fileName, emails.join('\n'));

  const mailOptions = {
    from: 'niteshv969@gmail.com',
    to: recipient,
    subject: subject,
    text: message,
    attachments: [
      {
        filename: fileName,
        path: path.join(__dirname, fileName)
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    // Remove the file after sending the email
    fs.unlinkSync(fileName);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
