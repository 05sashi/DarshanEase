const express = require('express')
const mongoose = require('mongoose')
const userrouter = require('./routes/userroutes')
const adminrouter = require('./routes/adminroutes')
const templereprouter=require('./routes/templereproutes')
const servicerouter=require('./routes/serviceroutes')
const donationrouter=require('./routes/donationroutes')
const announcementrouter=require('./routes/announcementroutes')
const contactrouter=require('./routes/contactroutes')
const cors = require('cors')
const app = express()
const port = 5500

app.use(cors({
  origin: 'http://localhost:5173'
}));
// Middleware
app.use(express.json())
app.use(userrouter)
app.use(adminrouter)
app.use(templereprouter)
app.use(servicerouter)
app.use(donationrouter)
app.use(announcementrouter)
app.use(contactrouter)

mongoose.connect('mongodb://localhost:27017/darshanease').then(() => {
    console.log('Connection is established')
}).catch((err) => {
    console.log('OOPS! Connection establishment is failed')
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})