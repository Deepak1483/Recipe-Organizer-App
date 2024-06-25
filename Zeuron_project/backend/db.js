const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY, userId INTEGER, title TEXT, category TEXT, instructions TEXT, image TEXT, FOREIGN KEY(userId) REFERENCES users(id))");
});

module.exports = db;
