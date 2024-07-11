const express=require('express')
const router=express.Router()
const announcementcontroller=require('../controllers/announcementcontroller')

router.get('/announcements',announcementcontroller.getallannouncements)
router.post('/announcements',announcementcontroller.createannouncement)
router.delete('/announcements/:id',announcementcontroller.deleteannouncement)
router.put('/announcements/:id',announcementcontroller.updateannouncement)

module.exports=router