const express = require('express');
const router = express.Router();
const contr = require('../controller/userController')

router.get('/get-all', contr.get_all_users)

router.post('/login', contr.login_post)

router.post('/register', contr.register_post)

router.post('/update', contr.update_user)

router.post('/loggedIn', contr.loggedIn)

router.post('/get', contr.get_user)

router.post('/delete', contr.delete_user)

module.exports = router;