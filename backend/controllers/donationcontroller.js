const Donation = require('../models/donation')

exports.getalldonations=async (req,res)=>{
    try {
        const donations=await Donation.find({})
        res.send(donations)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createdonation=async (req,res)=>{
    try {
        const donation=new Donation(req.body)
        await donation.save()
        res.status(201).send(donation)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.deletedonation=async (req,res)=>{
    try {
        const donation=await Donation.findByIdAndDelete(req.params.id)
        if(!donation){
            return res.status(404).send('Donation Not Found')
        }
        res.send(donation)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.updatedonation = async (req, res) => {
    try {
      const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!donation) {
        return res.status(404).send('Donation not found');
      }
      res.send(donation);
    } catch (error) {
      res.status(500).send(error);
    }
  };