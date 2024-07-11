const Contact = require('../models/contact')

exports.getallcontacts=async (req,res)=>{
    try {
        const contacts=await Contact.find({})
        res.send(contacts)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createcontact=async (req,res)=>{
    try {
        const contact=new Contact(req.body)
        await contact.save()
        res.status(201).send(contact)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.deletecontact=async (req,res)=>{
    try {
        const contact=await Contact.findByIdAndDelete(req.params.id)
        if(!contact){
            return res.status(404).send('Contact Not Found')
        }
        res.send(contact)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.updatecontact = async (req, res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!contact) {
        return res.status(404).send('Contact not found');
      }
      res.send(contact);
    } catch (error) {
      res.status(500).send(error);
    }
  };