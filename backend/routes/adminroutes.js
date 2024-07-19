const express = require('express')
const arouter = express.Router()
const admincontroller = require('../controllers/admincontrollers')

arouter.get('/admins', admincontroller.getalladmins)
arouter.post('/admins', admincontroller.createadmin)
arouter.post('/admin/login', admincontroller.loginadmin)

module.exports = arouter