const db = require('../db');
const bcrypt = require('bcryptjs');

const User = {
    create: (username, password, callback) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
                if (err) return callback(err);
                callback(null, { id: this.lastID });
            });
        });
    },
    findByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        });
    }
};

module.exports = User;
