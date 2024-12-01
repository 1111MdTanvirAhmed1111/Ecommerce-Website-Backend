
const jwt = require('jsonwebtoken')
const Usermodel = require('./../../Models/UserSchema')
const bcrypt = require('bcrypt')

module.exports = async (req,res)=>{
    try {
        

        const {email,pass} = req.body
        const DbUser = await Usermodel.findOne({email})
    
        if(DbUser){
    
            
        
        const PassCorrect = await bcrypt.compare(pass, DbUser.pass)
    
        if(!PassCorrect){
            res.send({"messege":"Password Is Incorrect","status":404})
        }else{
            const token  = jwt.sign({_id:DbUser._id},process.env.JWT_code)
            
            res.send({"messege":"Login Succeed","status":200,"jwt":token})
            
        }
    
    
        }else{
            res.send({"messege":"User Not Found","status":404})
        }


    } catch (error) {
        console.log(error)
    }
    


    
   

}   