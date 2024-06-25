const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const auth = require('../middleware/auth');

router.post('/', auth, (req, res) => {
    const { title, category, instructions, image } = req.body;
    Recipe.create(req.userId, title, category, instructions, image, (err, recipe) => {
        if (err) return res.status(400).send(err);
        res.status(201).json(recipe);
    });
});

router.get('/', auth, (req, res) => {
    Recipe.getAllByUserId(req.userId, (err, recipes) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(recipes);
    });
});

router.put('/:id', auth, (req, res) => {
    const { title, category, instructions, image } = req.body;
    Recipe.update(req.params.id, title, category, instructions, image, (err, result) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(result);
    });
});

router.delete('/:id', auth, (req, res) => {
    Recipe.delete(req.params.id, (err, result) => {
        if (err) return res.status(400).send(err);
        res.status(200).json(result);
    });
});

module.exports = router;
