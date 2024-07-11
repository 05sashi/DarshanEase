const mongoose=require('mongoose')

const serviceschema=new mongoose.Schema({
    service:String,
    description:String
})

const services=mongoose.model('services',serviceschema)
module.exports=services;