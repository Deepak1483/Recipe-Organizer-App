const db = require('../db');

const Recipe = {
    create: (userId, title, category, instructions, image, callback) => {
        db.run('INSERT INTO recipes (userId, title, category, instructions, image) VALUES (?, ?, ?, ?, ?)', 
            [userId, title, category, instructions, image], 
            function(err) {
                if (err) return callback(err);
                callback(null, { id: this.lastID });
        });
    },
    getAllByUserId: (userId, callback) => {
        db.all('SELECT * FROM recipes WHERE userId = ?', [userId], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    },
    update: (id, title, category, instructions, image, callback) => {
        db.run('UPDATE recipes SET title = ?, category = ?, instructions = ?, image = ? WHERE id = ?', 
            [title, category, instructions, image, id], 
            function(err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
        });
    },
    delete: (id, callback) => {
        db.run('DELETE FROM recipes WHERE id = ?', [id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    }
};

module.exports = Recipe;
