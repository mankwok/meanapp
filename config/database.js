const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: '',
    secret: crypto,
    option: {
        auth: {
            user: '',
            password: ''
        }
    }
}