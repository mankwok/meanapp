const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: '' + this.db,
    secret: crypto,
    db: 'angular'
}