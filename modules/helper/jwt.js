const jwt = require('jsonwebtoken');

function generateToken(id, username, isAdmin) {
    return jwt.sign({id, username, isAdmin}, process.env.JWT_SECRET, {
        expiresIn : '60d'
    });
}

function validate(header) {
   return jwt.verify(header.authorization.replace(/^Bearer\s+/, ""), process.env.JWT_SECRET, (err) => {
        if (err) return false;
        return true;
    });
}

function getTokenData(header) {
    return jwt.verify(header.authorization.replace(/^Bearer\s+/, ""), process.env.JWT_SECRET, (err, data) => {
        if (err) return false;
        return data;
    });
}

module.exports = {
    generateToken,
    validate,
    getTokenData
}
