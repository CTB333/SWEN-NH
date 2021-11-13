const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxAge = 2 * 24 * 60 * 60;
const key = process.env.JWT_KEY;

function createToken(id) {
    return jwt.sign({
        id
    }, key, {
        expiresIn: maxAge
    });
}

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1] 
}

const login_post = async (req, res) => {
    body = JSON.parse(Object.keys(req.body)[0]);
    email = body.email
    password = body.password
    try {
        const user = await User.login(email.toLowerCase(), password.toLowerCase())
        console.log(user)
        token = createToken(user._id)
        return res.json({success: true, token: token, type: 'login'})
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
        password: hash,
        statistics: true,
        identity: false,
        notifications: false
    })
    user.save().then((response) => {
        console.log('user saved')
        console.log(response)
        token = createToken(response._id)
        return res.json({success: true, token: token, type: 'register'})
    }).catch((err) => {
        return res.json({success: false, message: err.message, type: 'err'})
    })
    
}

const update_user = async (req, res) => {
    body = JSON.parse(Object.keys(req.body)[0]);
    stats = body.stats
    notif = body.notif
    iden = body.identity
    cookie = body.jwt
    try {
        token = jwt.verify(cookie, key)
        id = token.id
    } catch (err) {
        return res.send({
            success: false,
            message: 'Token is invalid'
        })
    }
    user = await User.findById(id)
    console.log(user)
    user.statistics = stats
    user.identity = iden
    user.notifications = notif
    await user.save()
    res.send({
        success: true
    })
}

const get_user = async (req, res) => {
    body = JSON.parse(Object.keys(req.body)[0]);
    try {
        id = jwt.verify(body.jwt, key).id
    } catch (err) {
        return res.send({
            success: false,
            message: 'Token is invalid'
        })
    }
    user = await User.findById(id)
    data = {
        name: user.name,
        email: user.email,
        stats: user.statistics,
        identity: user.identity,
        notifications: user.notifications
    }
    return res.send({
        success: true,
        user: data
    })
}

const loggedIn = (req, res) => {
    body = JSON.parse(Object.keys(req.body)[0]);
    try {
        token = jwt.verify(body.jwt, key)
        console.log(token)
        return res.send(true)
    } catch (err) {
        console.log('jwt error', err)
        return res.send(false)
    }
}

module.exports = {
    login_post,
    register_post,
    update_user,
    get_user,
    loggedIn
}