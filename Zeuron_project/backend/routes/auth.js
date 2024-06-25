const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    User.create(username, password, (err, user) => {
        if (err) return res.status(400).send('User already exists');
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
        res.status(201).json({ token });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (err, user) => {
        if (err || !user) return res.status(400).send('Invalid credentials');
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(400).send('Invalid credentials');
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
            res.status(200).json({ token });
        });
    });
});

module.exports = router;
