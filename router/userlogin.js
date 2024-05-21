const express = require('express')
const router = express.Router()
const userController = require('../controller/userlogin')

router
    .post('/register',userController.register)
    .get('/users',userController.showUsers)
    .post('/signin',userController.signin)
exports.router = router
