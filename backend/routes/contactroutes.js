const express=require('express')
const router=express.Router()
const contactcontroller=require('../controllers/contactcontroller')

router.get('/contacts',contactcontroller.getallcontacts)
router.post('/contacts',contactcontroller.createcontact)
router.delete('/contacts/:id',contactcontroller.deletecontact)
router.put('/contacts/:id',contactcontroller.updatecontact)

module.exports=router