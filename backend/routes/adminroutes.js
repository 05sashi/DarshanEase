const express = require('express')
const arouter = express.Router()
const admincontroller = require('../controllers/admincontrollers')

arouter.get('/admins', admincontroller.getalladmins)
arouter.post('/admins', admincontroller.createadmin)

module.exports = arouter