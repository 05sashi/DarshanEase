const Service=require('../models/service')

exports.getallservices=async (req,res)=>{
    try {
        const services=await Service.find({})
        res.send(services)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.createservice=async (req,res)=>{
    try {
        const service=new Service(req.body)
        await service.save()
        res.status(201).send(service)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.deleteservice=async (req,res)=>{
    try {
        const service=await Service.findByIdAndDelete(req.params.id)
        if(!service){
            return res.status(404).send('Service Not Found')
        }
        res.send(service)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.updateservice = async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!service) {
        return res.status(404).send('Service not found');
      }
      res.send(service);
    } catch (error) {
      res.status(500).send(error);
    }
  };