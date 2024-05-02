const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = '4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d'; //static secret key as a hexadecimal value

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            const token = parts[1];

            jwt.verify(token, secretKey, (err, userDecoded) => {
                if (err) {
                    return res.status(401).send({ error: 'Invalid token' });
                }

                // Ensure the payload contains 'id'
                if (!userDecoded || !userDecoded.id) {
                    return res.status(401).send({ error: 'Invalid token payload!' });
                }

                req.userId = userDecoded.id; // we can access the user ID in routes
                next();
            });
        } else {
            return res.status(401).send({ auth: false, message: 'Invalid token format.'});
        }
    } else {
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    }
};

module.exports = verifyToken;
