const User=require('../models/user')

exports.getallusers=async (req,res)=>{
    try {
        const userss=await User.find({})
        res.send(userss)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createuser=async (req,res)=>{
    try {
        const user=new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
} 