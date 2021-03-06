const express = require('express')
const app = express()
const index = require('./controller/index')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instagram', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json())
app.get('/', (req, res) => {
  res.send("Application is running on port 3000!!")
})

app.get('/instagram', (req, res) => {
  res.send("Instagram Home Page !!")
})

app.use('/instagram', index)

app.listen(3000, () => {
  console.log("server is running on port 3000")
})




/*

http://localhost:3000/instagram/userAccounts/signup   // post
http://localhost:3000/instagram/userAccounts/signup/verify/571307   //get + otp in header
http://localhost:3000/instagram/userAccounts/signin  // post (UserName + Password)
http://localhost:3000/instagram/userAccounts/Jiya__  // get,put,delete


http://localhost:3000/instagram/follow     // get , post
http://localhost:3000/instagram/follow/Jinal_   // get , delete
http://localhost:3000/instagram/follow/Jinal_/follower    // get
http://localhost:3000/instagram/follow/Jinal_/following  // get


*/