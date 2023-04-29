const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '1mb',
  })
);

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false,
  auth: {
    user: 'MS_xIS4r7@okctennis.com',
    pass: 'YFshh4IsFAj0N3dY',
  },
});

app.post('/register', async (req, res) => {
  const {
    firstName = '',
    lastName = '',
    level = '',
    email = '',
    phone = '',
  } = req.body;

  const contentHTML = `<strong>Name:</strong> ${firstName} ${lastName}<br> 
                      <strong>Level:</strong> ${level} <br> 
                     <strong>Email:</strong> ${email} <br> 
                     <strong>Phone:</strong> ${phone}`;
  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"OkcTennis" <admin@okctennis.com>',
      to: 'zulfikar1ahmad@gmail.com',
      subject: `Tennis Registration: ${firstName} ${lastName}`,
      html: contentHTML,
    });
  } catch (error) {
    console.log(error.message);
  }

  res.status(200).json({
    status: 'ok',
  });
});

app.listen(1233, () => {
  console.log('server is running on port 1233');
});
