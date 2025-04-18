const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    phoneNo:{
        type:Number,
    },
    status:{
        type:Boolean,
        default:true
    },
    roleId:{
        type:Schema.Types.ObjectId, //batugasoijkadsasiksaj
        ref:"roles"
    },
    company_name:{
        type:String,
    },
    company_description:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
    }
    

})

module.exports = mongoose.model("users",userSchema)