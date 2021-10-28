const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const login_post = async (req, res) => {
    body = JSON.parse(Object.keys(req.body)[0]);
    email = body.email
    password = body.password
    try {
        const user = await User.login(email.toLowerCase(), password.toLowerCase())
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
    user.save().then((response) => {
        console.log('user saved')
        console.log(response)
        return res.json({success: true, message: response._id, type: 'register'})
    }).catch((err) => {
        return res.json({success: false, message: err.message, type: 'err'})
    })
    
}

module.exports = {
    login_post,
    register_post
}