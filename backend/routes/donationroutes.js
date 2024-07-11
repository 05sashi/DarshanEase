const express=require('express')
const router=express.Router()
const donationcontroller=require('../controllers/donationcontroller')

router.get('/donations',donationcontroller.getalldonations)
router.post('/donations',donationcontroller.createdonation)
router.delete('/donations/:id',donationcontroller.deletedonation)
router.put('/donations/:id',donationcontroller.updatedonation)

module.exports=router