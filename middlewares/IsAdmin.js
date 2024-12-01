const User= require('./../Models/UserSchema')
const jwt = require('jsonwebtoken')


const isAdmin = async (req,res,next)=>{
    try {
        const token =req.headers.authorization
if(token){
    const {_id}  = jwt.verify(token,process.env.JWT_code)
       
    const userData = await User.findById(_id)
    
    if(userData.admin){
        next()
    }else{
        res.status(404).send({"messege":"You Are not An Admin"})
    }
}
else{
    res.status(404).send({"messege":"Token Must Be Provided"})
}

    } catch (error) {
        console.log(error)
    }

  

}

module.exports = {isAdmin}