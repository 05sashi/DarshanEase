const Admin=require('../models/admin')

exports.getalladmins=async (req,res)=>{
    try {
        const adminss=await Admin.find({})
        res.send(adminss)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createadmin=async (req,res)=>{
    try {
        const admin=new Admin(req.body)
        await admin.save()
        res.status(201).send(admin)
    } catch (error) {
        res.status(500).send(error)
    }
} 