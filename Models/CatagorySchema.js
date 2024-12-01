const { default: mongoose } = require("mongoose");
const CatagorySchema = mongoose.Schema({
    label: String,
    value: String,

})



module.exports = mongoose.model("Catagory" ,CatagorySchema)