const express=require('express')
const router=express.Router()
const servicecontroller=require('../controllers/servicecontroller')

router.get('/services',servicecontroller.getallservices)
router.post('/services',servicecontroller.createservice)
router.delete('/services/:id',servicecontroller.deleteservice)
router.put('/services/:id',servicecontroller.updateservice)

module.exports=router