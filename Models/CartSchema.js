const { default: mongoose } = require("mongoose");
const CartSchema = mongoose.Schema({
    userId: String,
    cartItems:  [ { productId: String, quantity: Number } ]

})



module.exports = mongoose.model("Cart" ,CartSchema)