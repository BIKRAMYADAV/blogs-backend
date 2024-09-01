const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./configs/auth')
const privateRoutes = require('./routes/private')
dotenv.config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const app = express()

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/private',privateRoutes);

app.listen(PORT, (req, res) => {
    console.log(`The app is listening on port ${PORT}`);
})