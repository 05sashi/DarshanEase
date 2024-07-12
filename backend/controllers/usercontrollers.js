const User = require('../models/user')

exports.getallusers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createuser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({ ...user.toObject(), password: undefined })
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.passcheck = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isPasswordValid = (password === user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        res.json({ message: 'Login successful', user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}