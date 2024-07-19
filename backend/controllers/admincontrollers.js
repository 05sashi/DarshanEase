const Admin = require('../models/admin')

exports.getalladmins = async (req, res) => {
    try {
        const adminss = await Admin.find({}).select('-password')
        res.send(adminss)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createadmin = async (req, res) => {
    try {
        const admin = new Admin(req.body)
        await admin.save()
        res.status(201).send({ ...admin.toObject(), password: undefined })
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.loginadmin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        if (password !== admin.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        res.json({ message: 'Login successful', admin: { id: admin._id, name: admin.name, email: admin.email } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}