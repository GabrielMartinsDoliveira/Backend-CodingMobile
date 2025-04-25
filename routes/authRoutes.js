const express = require('express')
const Login = require('../controller/authController')
const router = express.Router()


router.post('/', Login)

module.exports = router