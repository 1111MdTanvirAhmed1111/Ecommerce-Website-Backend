const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    name : {type: String, required : true},
    img: {type: String , default: "img"},
    email: {type: String, required : true},
    pass: {type: String, required : true},
    phone: {type: String, required : true},
    admin: {type: Boolean, default: false},
    reviews: {type:Array , default: [{}]},
    orders:{
        type : [
            {
                productId: String,
                date: {type:String}
            }
        ],
        default: []
    }
    
    
})

module.exports = mongoose.model("User" , UserSchema)