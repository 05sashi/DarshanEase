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

exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;
      
      // Remove password from updates if it's present
      delete updates.password;
      
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        updates, 
        { new: true, runValidators: true }
      ).select('-password');
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };