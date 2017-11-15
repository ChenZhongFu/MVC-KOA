const db = require('../db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN,
    login_time:db.BIGINT,
    login_count:db.INTEGER,
    last_login_time:db.BIGINT,
    login_continue_count:db.INTEGER,
    lock:db.INTEGER,
    level:db.INTEGER
});
