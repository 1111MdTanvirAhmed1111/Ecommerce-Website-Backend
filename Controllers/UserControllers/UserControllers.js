const User= require('../../Models/UserSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


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
    if(!token){
        res.status(404).send({"messege":"User Not valid"})

}else{
  
    const {_id}  = jwt.verify(token,process.env.JWT_code)
    const updatedUser = await User.findOneAndUpdate({_id},req.body,{new: true})
    
    if(updatedUser){res.status(200).send({"messege":"Edit Successful",updatedUser})
    }else{
        res.status(404).send({"messege":"Edit UnSuccessful"})
}
}
}

const cngPass = async (req,res)=>{
    try {
        const token =req.headers.authorization
        const {_id}  = jwt.verify(token,process.env.JWT_code)



        const user = await User.findOne({_id})
        if(!_id){
            res.status(404).send({"messege":"User Not Valid"})
        }else{
            
const {currPass,newPass} = req.body

const out = await bcrypt.compare(currPass,user.pass); 
console.log(out)
if(out){

    const editedValue = await User.findOneAndUpdate({_id},{pass: await bcrypt.hash(newPass,10)}, {
        new: true
      })

      res.status(404).send({"messege":"Password Updated"})
}
else{
    res.status(404).send({"messege":"Pass cng Failed"})
}

        }


    } catch (error) {
        console.log(error)
    }
}

module.exports = {GetUser,PutUser,cngPass}