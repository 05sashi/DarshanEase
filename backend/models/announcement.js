const mongoose=require('mongoose')

const announcementschema=new mongoose.Schema({
    name:String,
    content:String
})

const announcements=mongoose.model('announcements',announcementschema)
module.exports=announcements