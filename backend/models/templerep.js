const mongoose = require('mongoose')

const templerepschema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tname: String,
    taddress: String
})

const templerepss = mongoose.model('templereps', templerepschema)
module.exports = templerepss