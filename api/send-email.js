const handleContact = require('../server/contact');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    return handleContact(req, res);
};
