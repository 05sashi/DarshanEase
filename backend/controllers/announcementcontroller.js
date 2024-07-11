const Announcement = require('../models/announcement')

exports.getallannouncements=async (req,res)=>{
    try {
        const announcements=await Announcement.find({})
        res.send(announcements)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createannouncement=async (req,res)=>{
    try {
        const announcement=new Announcement(req.body)
        await announcement.save()
        res.status(201).send(announcement)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.deleteannouncement=async (req,res)=>{
    try {
        const announcement=await Announcement.findByIdAndDelete(req.params.id)
        if(!announcement){
            return res.status(404).send('Announcement Not Found')
        }
        res.send(announcement)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.updateannouncement = async (req, res) => {
    try {
      const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!announcement) {
        return res.status(404).send('Announcement not found');
      }
      res.send(announcement);
    } catch (error) {
      res.status(500).send(error);
    }
  };