const mongoose= require ('mongoose')
const Schema= mongoose.Schema

const jobSchema= new Schema({
    userId:{
        type: String,
        required: true,
    },
    JobTitle:{
        type: String,
        required: true,
    },
    Description:{
        type : String,
        required: true,
    },
    JobSalary:{
        type: Number,
    },
    stateId:{
        type : String,
        required: true,
    },
    cityId:{
        type : String,
        required: true,
    }

},{
    timestamps: true
})
module.exports= mongoose.model('Job_Details', jobSchema);