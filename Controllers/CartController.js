const Cart = require('./../Models/CartSchema')
const jwt = require('jsonwebtoken')


const cartController = async (req,res)=>{
    const token =req.headers.authorization
    const {_id}  = jwt.verify(token,process.env.JWT_code)
   const arr = req.body

   const IfCartExisted = await Cart.findOne({userId:_id})

    if(IfCartExisted){
        const updatedCart = await Cart.findOneAndUpdate({userId:_id},{
            cartItems: req.body
           },{new: true})
    
           if(updatedCart){res.status(200).send({"messege":"Cart Successful",cart:updatedCart})
           }else{
               res.status(404).send({"messege":"Cart Create UnSuccessful"})
        }



    }else{


        const cart = await Cart.create({
            userId: _id,
            cartItems: req.body
           })
        
        
           if(cart){res.status(200).send({"messege":"Cart Successful",cart})
           }else{
               res.status(404).send({"messege":"Cart Create UnSuccessful"})
        }
        
    }



  


}
module.exports= {cartController}