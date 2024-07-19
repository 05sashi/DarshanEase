const express = require('express')
const urouter = express.Router()
const usercontroller = require('../controllers/usercontrollers')

urouter.get('/users', usercontroller.getallusers)
urouter.post('/users', usercontroller.createuser)
urouter.post('/userlogin', usercontroller.passcheck)
urouter.delete('/users/:id', usercontroller.deleteUser);
urouter.put('/users/:id', usercontroller.updateUser);



module.exports = urouter