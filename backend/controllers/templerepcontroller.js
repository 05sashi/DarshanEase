const Templerep = require('../models/templerep')

exports.getalltemplereps = async (req, res) => {
    try {
        const templerepss = await Templerep.find({}).select('-password')
        res.send(templerepss)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createtemplerep = async (req, res) => {
    try {
        const templerep = new Templerep(req.body)
        await templerep.save()
        res.status(201).send({ ...templerep.toObject(), password: undefined })
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.passcheck = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await Templerep.findOne({ email });
        
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


