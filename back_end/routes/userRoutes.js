const express = require('express');
const router = express.Router();
const contr = require('../controller/userController')

router.post('/login', contr.login_post)

router.post('/register', contr.register_post)

module.exports = router;