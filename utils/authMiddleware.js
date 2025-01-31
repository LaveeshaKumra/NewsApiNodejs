const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied.');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.user = decoded;
        next();
    });
};
