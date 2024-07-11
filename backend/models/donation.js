const mongoose=require('mongoose')

const donationschema=new mongoose.Schema({
    name:String,
    amount:Number
})

const donations=mongoose.model('donations',donationschema)
module.exports=donations