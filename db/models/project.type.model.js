const mongoose = require("mongoose")

const projectTypeSchema = mongoose.Schema({
    type:{
        type:String, 
        trim:true,
        lowercase:true,
        unique: true,
        required:true
    }, 
    details: {
        type:String, 
    }
}, {
    timestamps:true
})

const ProjectType = mongoose.model("ProjectType", projectTypeSchema)
module.exports = ProjectType