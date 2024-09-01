const express = require('express');
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.listen(PORT, (req, res) => {
    console.log(`The app is listening on port ${PORT}`);
})