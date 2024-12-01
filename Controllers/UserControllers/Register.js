const cloudinary = require("../../middlewares/Cloudinary");
const Usermodel = require("../../Models/UserSchema");
const fs = require('fs')
const bcrypt = require('bcrypt')

module.exports =  async (req,res)=>{
    try {
    const {name,email,pass,phone} = req.body
    
// Check If THe User Already Exists At First
const alreadyExists = await Usermodel.findOne({email,phone})

        if(alreadyExists){res.status(404).send({"messege": "User Already Exists","status": 404}) }
    else{
    
    
     
     // Account DatBase User Information Starts Here    
    const uploads =await Usermodel.create({name,email,pass:await bcrypt.hash(pass,10),phone})   
   uploads ? res.status(200).send({"messege": "Registration Succesfull","status": 200}) : res.status(404).send({"messege": "Registration unsuccesfull","status": 404})
    
    //  Handeling Main Error
    }}catch (error) {console.log(error)}
         
}