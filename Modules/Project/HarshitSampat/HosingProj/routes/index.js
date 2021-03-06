//const config = require('../config/');
const verifyTOken = require('../Authentication/verifytoken')
const express= require('express');
const router = express.Router();
const interiorMatrials = require('./api/interiorMaterialRoute');
const packersAndMoversRoute = require('./api/packersAndMoversRoute');
const payment = require('./api/paymentroute')
const proprty = require('./api/propertyRoute');
const propertyManagement = require('./api/propertyMangement');
const rentAgreement = require('./api/rentAgreeementroute');
const rent = require('./api/rentRoute');
const solarRooftop = require('./api/solarRooftop')
const user = require('./api/userRoute')

// if(!config.get('jwtPrivatKey')){
//     console.error('FATAL ERROR : jwtPrivatKey is not defined')
//     process.exit(1);
//   }

//get request upto index
router.get('/',(req,res)=>{
    res.send("Welcome to the application")
})

//api routers
router.use('/api/interior',interiorMatrials);
router.use('/api/packersAndMovers',verifyTOken ,packersAndMoversRoute);
router.use('/api/payment',verifyTOken,payment)
router.use('/api/property',proprty);
router.use('/api/propertyManagement',verifyTOken,propertyManagement);
router.use('/api/rentAgreement',verifyTOken,rentAgreement);
router.use('/api/rent',rent);
router.use('/api/soalarrooftop',solarRooftop)
router.use('/api/user',user)

module.exports = router
