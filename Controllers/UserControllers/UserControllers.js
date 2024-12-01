const User= require('../../Models/UserSchema')
const jwt = require('jsonwebtoken')



const GetUser = async (req,res)=>{
try {
 const token =req.headers.authorization
    const {_id}  = jwt.verify(token,process.env.JWT_code)
   
const userData = await User.findById(_id)
    
if(!userData){
    res.status(404).send({"messege": "User Not Available"})
}
res.status(200).send({"messege": "Successful",userData})

 
} catch (error) {
    console.log(error)
}
}


const PutUser = async (req,res)=>{

    const token =req.headers.authorization
    const {_id}  = jwt.verify(token,process.env.JWT_code)
    const updatedUser = await User.findOneAndUpdate({_id},req.body,{new: true})
    
    if(updatedUser){res.status(200).send({"messege":"Edit Successful",updatedUser})
    }else{
        res.status(404).send({"messege":"Edit UnSuccessful"})
}
}

module.exports = {GetUser,PutUser}