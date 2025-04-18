const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId, //batugasoijkadsasiksaj
        ref:"user"
    },
    jobId:{
        type:Schema.Types.ObjectId, //batugasoijkadsasiksaj
        ref:"job"
    },
    resume:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
      },
},{
    timestamps: true  
})

module.exports = mongoose.model("Job_Request",userSchema)