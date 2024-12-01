const Catagory = require('./../Models/CatagorySchema')

const addCatagory = async (req,res)=>{
    const {label} = req.body
const createdCatagory = await Catagory.create({label,value:label.slice(0,3).toLowerCase()})
    if(createdCatagory){
        res.status(200).send({"messege":"catagory created","status":200,createdCatagory})
    }
}

const DeleteCatagory = async (req,res)=>{
    const {_id} = req.params
const createdCatagory = await Catagory.findByIdAndDelete(_id)
    if(createdCatagory){
        res.status(200).send({"messege":"catagory deleted","status":200})
    }
}

const ReadCatagory = async (req,res)=>{
    const Catagories = await Catagory.find(req.body)
    if(Catagories.length == 0){
        res.status(200).send({"messege":"Catagories Available","status":404})  
    }else{

        res.status(200).send(Catagories)

    }
}


module.exports= {addCatagory,DeleteCatagory,ReadCatagory}