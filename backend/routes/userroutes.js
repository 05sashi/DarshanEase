const express = require('express')
const urouter = express.Router()
const usercontroller = require('../controllers/usercontrollers')

urouter.get('/users', usercontroller.getallusers)
urouter.post('/users', usercontroller.createuser)
urouter.post('/userlogin', usercontroller.passcheck)

module.exports = urouter