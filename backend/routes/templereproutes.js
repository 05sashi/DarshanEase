const express = require('express')
const trouter = express.Router()
const templerepcontroller = require('../controllers/templerepcontroller')

trouter.get('/templereps', templerepcontroller.getalltemplereps)
trouter.post('/templereps', templerepcontroller.createtemplerep)
trouter.post('/templelogin', templerepcontroller.passcheck)
trouter.get('/availableTemples', templerepcontroller.getAvailableTemples)

module.exports = trouter