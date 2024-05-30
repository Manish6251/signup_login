const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});