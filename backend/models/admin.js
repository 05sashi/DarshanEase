const mongoose=require('mongoose')

const adminschema=new mongoose.Schema({
    name:String,
    mobile:String,
    email:String,
    password:String
})

const admins=mongoose.model('admins',adminschema)
module.exports=admins