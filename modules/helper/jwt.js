const jwt = require('jsonwebtoken');

function generateToken(username, isAdmin) {
    return jwt.sign({username, isAdmin}, process.env.JWT_SECRET, {
        expiresIn : '60d'
    });
}

function validate(header) {
    jwt.verify(header['x-access-token'], process.env.JWT_SECRET, (err) => {
       if (err) return false;
       return true;
    });
}

function getTokenData(header) {
    jwt.verify(header['x-access-token'], process.env.JWT_SECRET, (err, data) => {
        if (err) return false;
        return data;
    });
}

module.exports = {
    generateToken,
    validate,
    getTokenData
}
