const nodemailer = require('nodemailer');

const handleContact = (req, res) => {
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

    return transporter
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
};

module.exports = handleContact;
