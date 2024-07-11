const mongoose=require('mongoose')

const contactschema=new mongoose.Schema({
    email:String,
    mobile:String,
    timings:String
})

const contacts=mongoose.model('contacts',contactschema)
module.exports=contacts