const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../db/models/userModel')
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
    try {
        const {username,password} = req.body;
        let user = await User.findOne({username});
        if(user)
            return res.status(400).json({message: "user already exists"});
         user = new User({username,password});
         await user.save();

         res.status(201).json({message: "user registered successfully"});
        
        } catch (error) {
            res.status(500).json({message: "server error"});
        }
})

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!user) return res.status(400).json({message: "invalid credentials"})

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({message: "invalid credentials"})

        const payload = {userId : user._id};

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '6h'});

        res.json({token});
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
})

module.exports = router;