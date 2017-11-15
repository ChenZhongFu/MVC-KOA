const db = require('../db');

module.exports = db.defineModel('business', {
    yewu: db.STRING(255),
    url: db.STRING(255)
});