const express = require('express')
const router = express.Router()
const userController = require('../controller/users')

router
    .post("/profile",userController.setupProfile)
    .get("/profile/:email",userController.getUserByEmail)

exports.router = router