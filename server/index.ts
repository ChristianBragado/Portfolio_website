const express = require('express');
const path = require('path');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const compression = require('compression');

const app = express();
const port = 8080;

app.use(cors());
app.use(compression());

// Have Node serve the files for our built React app
const publicRoot = path.resolve(__dirname, '../public');
app.use(express.static(publicRoot));

// Let the inner React app handle direct visits and refreshes on showcase tabs.
app.get('/os/*', (_req, res) => {
    res.sendFile(path.join(publicRoot, 'os', 'index.html'));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Handle GET requests to /api route
app.post('/api/send-email', (req, res) => {
    const { name, company, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({
            message: 'Name, email, and message are required.',
        });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.FOLIO_EMAIL,
            pass: process.env.FOLIO_PASSWORD,
        },
    });

    transporter
        .sendMail({
            from: process.env.FOLIO_EMAIL || 'christianhbragado@gmail.com',
            replyTo: email,
            to: 'christianhbragado@gmail.com, christian.bragado@icloud.com',
            subject: `${name}${company ? ` from ${company}` : ''} submitted a contact form`,
            text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\n${message}`,
        })
        .then(() => {
            res.json({ message: 'success' });
        })
        .catch((error) => {
            console.error('Contact form delivery failed:', error);
            res.status(500).json({
                message: 'Unable to deliver the message right now.',
            });
        });
});

// listen to app on port 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
