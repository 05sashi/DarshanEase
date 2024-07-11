const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    name:String,
    mobile:String,
    email:String,
    password:String
})

const users=mongoose.model('users',userschema)
module.exports=users