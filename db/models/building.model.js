const mongoose = require("mongoose")

const buildingSchema = mongoose.Schema({
    projectid:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Project"
    },
    buildingNumber:{
        type:String,
        required: true,
        trim:true
    },
    area:{
        type:String, 
        trim:true,
        required:true,
        trim:true
    },
    floors:{
        type:Number,
        required:true
    },
    units: [{
        unitname:{
            type:String, 
            trim:true,
            required: true
        },
        unitSpace:{
            type:Number
        },
        unitPrice:{
            type:Number
        },
        currency:{
            type:String, 
            trim:true
        },
        unitStatus:{
            type:Boolean,
            default: true //true => available, false => sold
        }
    }]
}, {
    timestamps:true
})
buildingSchema.methods.generateUnits = async function(){
    const building = this
    for (let i = 1; i <= building.floors; i++) {
        for (let j = 1; j <= 4; j++) {
            unitname = `${i}${j}`
            building.units =  building.units.concat({unitname})
        }
    }
    await building.save()
}

const Building = mongoose.model("Building", buildingSchema)
module.exports = Building