const { default: mongoose } = require("mongoose");
const ProductSchema = mongoose.Schema({
    img: String,
    headline: String,
    description: String,
    catagory: String,
    imgPPL : String,
    stock: {type: Number, default: 0},
    price: Number
})



module.exports = mongoose.model("Product" ,ProductSchema)