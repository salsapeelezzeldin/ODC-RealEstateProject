const mongoose = require("mongoose")

const projectSchema = mongoose.Schema({
    name:{
        type:String, 
        trim:true,
        required:true
    },
    type:{
        type:String,
        required: true,
        ref:"ProjectType"
    },
    owner:{
        type:String, 
        trim:true,
        required:true
    },
    startingDate:{
        type:Date
    },
    endingDate:{
        type:Date
    },
    city:{
        type:String, 
        trim:true
    },
    location:{
        type:String, 
        trim:true
    },
    space:{
        type:String, 
        trim:true
    },
    details:{
        type:String, 
        trim:true
    },
    features:{
        type:String, 
        trim:true
    },
    images: [{
        image:{
            type:String, 
            trim:true,
        }
    }]
}, {
    timestamps:true
})

const Project = mongoose.model("Project", projectSchema)
module.exports = Project