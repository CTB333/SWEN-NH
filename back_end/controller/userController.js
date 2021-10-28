const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const bcrypt = require('bcrypt');

const maxAge = 2 * 60 * 60;
const key = process.env.JWT_KEY;

function createToken(id) {
    return jwt.sign({
        id
    }, key, {
        expiresIn: maxAge
    });
}

const login_post = async (req, res) => {
    body = JSON.parse(Object.keys(req.body)[0]);
    email = body.email
    password = body.password
    try {
        const user = await User.login(email.toLowerCase(), password.toLowerCase())
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: (maxAge * 1000),
            secure: true
        });
        return res.json({success: true, message: user._id, type: 'login'})
    } catch (err) {
        console.log('err:', err)
        return res.json({success: false, message: err.message, type: 'err'})
    }
}

const register_post = async (req, res) => {
    body = JSON.parse(Object.keys(req.body)[0]);
    hash = await bcrypt.hash(body.password.toLowerCase(), 10)
    const user = new User({
        name: body.name.toLowerCase(),
        email: body.email.toLowerCase(),
        password: hash
    })
    const token = createToken(user._id)
    user.save().then((response) => {
        console.log('user saved')
        console.log(response)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: (maxAge * 1000),
            secure: true
        });
        return res.json({success: true, message: response._id, type: 'register'})
    }).catch((err) => {
        return res.json({success: false, message: err.message, type: 'err'})
    })
    
}

module.exports = {
    login_post,
    register_post
}