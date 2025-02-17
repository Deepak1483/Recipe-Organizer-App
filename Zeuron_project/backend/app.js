const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
