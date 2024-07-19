const Templerep = require('../models/templerep')

exports.getalltemplereps = async (req, res) => {
    try {
        const templerepss = await Templerep.find({}).select('-password')
        res.send(templerepss)
    } catch (error) {
        res.status(500).send(error)
    }
}

const capitalizeTembleName = (name) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };
  
  exports.createtemplerep = async (req, res) => {
      try {
          const templerep = new Templerep({
              ...req.body,
              tname: capitalizeTembleName(req.body.tname)
          });
          await templerep.save();
          res.status(201).send({ ...templerep.toObject(), password: undefined });
      } catch (error) {
          res.status(500).send(error);
      }
  };
  
  exports.updateTemplerep = async (req, res) => {
      try {
          const updatedData = { ...req.body };
          if (updatedData.tname) {
              updatedData.tname = capitalizeTembleName(updatedData.tname);
          }
          const updatedTemplerep = await Templerep.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true }).select('-password');
          if (!updatedTemplerep) {
              return res.status(404).send({ message: 'Temple representative not found' });
          }
          res.send({ message: 'Temple representative updated successfully', templerep: updatedTemplerep });
      } catch (error) {
          res.status(400).send(error);
      }
  };
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


exports.getAvailableTemples = async (req, res) => {
    try {
        const temples = await Templerep.distinct('tname');
        res.json(temples);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteTemplerep = async (req, res) => {
    try {
        const deletedTemplerep = await Templerep.findByIdAndDelete(req.params.id);
        if (!deletedTemplerep) {
            return res.status(404).send({ message: 'Temple representative not found' });
        }
        res.send({ message: 'Temple representative deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};