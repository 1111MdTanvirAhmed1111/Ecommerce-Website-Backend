const Product = require("../Models/ProductSchema")
const cloudinary = require('./../middlewares/Cloudinary')
const fs = require('fs')

const CreateProduct = async(req,res)=>{
    try {
        const {headline,description,catagory,price} = JSON.parse(req.body.Pdata)
        const imgPath = req.file.path
        
        const xxs = Math.random().toString()

            
        const {url}= await cloudinary.uploader
        .upload(
            imgPath , {
                public_id: xxs,
            }
        ).catch(error =>  console.log(error))

        if(url){
            let resultHandler = err=> err ? console.log("unlink failed", err) : console.log("file deleted")
               
                
            fs.unlink(imgPath, resultHandler)
        }
        const product = await Product.create({img:url,headline,description,catagory,imgPPL:xxs,price})

        
            res.status(200).send( {"messege":"Product Creation Succeed","status":200,product})


    } catch (error) {
        console.log(error)
    }

}

const GetAllProducts = async (req,res) =>{

    var regex = new RegExp(req.query.headline, 'i')

    const products = await Product.find({headline:regex})

    if(products.length == 0){
        res.status(200).send({"messege":"No Products Available","status":404})  
    }else{

        res.status(200).send(products)

    }

    console.log()

}

const GetOneProduct =  async (req,res) =>{
        const {_id} = req.params

    const products = await Product.findOne({_id})

    if(!products){
        res.send({"messege":"Product Not Found","status":404})
    }

    res.status(200).send(products)
}


const DeleteOneProduct =  async (req,res) =>{
    const {_id} = req.params

    const products = await Product.findByIdAndDelete(_id)

    cloudinary.uploader.destroy(products.imgPPL, function(result) { });


    res.send({"messege":"Deletation Successful","status":404})
}



const UpdateOneProduct = async (req,res) =>{
    try {
        const {headline,description,catagory,price} = JSON.parse(req.body.Pdata)
    const xxs = Math.random().toString()
    const {_id} = req.params
    const products = await Product.findOne({_id})

if(req.file){
    const imgPath = req.file.path
    cloudinary.uploader.destroy(products.imgPPL, function(result) { });

    const {url}= await cloudinary.uploader
    .upload(
        imgPath , {
            public_id: xxs,
        }
    ).catch(error =>  console.log(error))
    
    if(url){
        let resultHandler = err=> err ? console.log("unlink failed", err) : console.log("file deleted")
           
            
        fs.unlink(imgPath, resultHandler)
    }


    const updatedObj = await Product.findByIdAndUpdate(_id,{img:url,headline,description,catagory,imgPPL:xxs,price},{new: true},)
    res.status(200).send( {"messege":"Product Creation Succeed","status":200,product:updatedObj})

}else{
    const updatedObj = await Product.findByIdAndUpdate(_id,{headline,description,catagory,imgPPL:xxs,price},{new: true})

    res.status(200).send( {"messege":"Product Creation Succeed","status":200,product:updatedObj})
}


    } catch (error) {
        console.log(error)
    }
}


module.exports = {CreateProduct,GetAllProducts,GetOneProduct,DeleteOneProduct,UpdateOneProduct}
