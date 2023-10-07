const express = require("express");
require("dotenv").config();
const cors = require('cors'); // Import the cors package

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

// Use the cors middleware to enable CORS
app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON request bodies

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
    console.log('message sent');
  } catch (e) {
    console.error(e);
  }
}

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/send-email', (req, res) => {
  const { email } = req.body;

  sendMail({
    to: email,
    from: "madhikarmianshu@gmail.com",
    subject: 'Welcome to DevLink!',
    text: "Hello and thank you for joining the DevLink community. We hope your journey on our site is prosperous."
  });

  res.send('Email sent successfully');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
