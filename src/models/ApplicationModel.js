const mongoose= require ('mongoose')
const Schema= mongoose.Schema

const applicationSchema= new Schema({
    userId:{
        type: String,
        required: true,
    },
    JobId:{
        type: String,
        required: true,
    },
    resumeURL:{
        type: String,
        required: true
    },

},{
    timestamps: true
})
module.exports= mongoose.model('Application_Details', applicationSchema);