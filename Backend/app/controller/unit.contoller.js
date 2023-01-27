const unitModel = require("../../db/models/building.model")
const myHelper = require("../../app/helper")

class Unit{
    static allUnits = async(req,res) => {
        try{
            const UnitsData = await unitModel.find()
            if(!UnitsData) throw new Error("Units not found")
            let units = []
            UnitsData.forEach((unit) => {
                units.push(unit.units)
            })
            myHelper.resHandler(res, 200, true, units, "Units fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static allBuldingUnits = async(req,res) => {
        try{
            const UnitsData = await unitModel.findById(req.params.id)
            if(!UnitsData) throw new Error("Units not found")
            myHelper.resHandler(res, 200, true, UnitsData.units, "Units fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static allProjectUnits = async(req,res) => {
        try{
            const UnitsData = await unitModel.find({
                projectid: req.params.id
            })
            if(!UnitsData) throw new Error("Units not found")
            let units = []
            UnitsData.forEach((unit) => {
                units.push(unit.units)
            })
            myHelper.resHandler(res, 200, true, units, "Units fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    // static singleUnit = async(req, res)=>{
    //     try{
    //         const UnitsData = await unitModel.find()
    //         if(!UnitsData) throw new Error("Unit not found")
    //         let UnitData
    //         UnitsData.forEach((Units) => {
    //             Units.units.forEach((unit) => {
    //                 if (unit._id == req.params.id)
    //                     UnitData = unit
    //             })
    //         })
    //         if(!UnitData) throw new Error("Unit not found")
    //         myHelper.resHandler(res, 200, true, UnitData,"Unit fetched successfully")
    //     }
    //     catch(e){
    //         myHelper.resHandler(res, 500, false, e, e.message)
    //     }
    // }
    static singleUnit = async(req, res)=>{
        try{
            const UnitsData = await unitModel.findOne({
                _id: req.params.buildID,
                "units._id": req.params.id
            })
            if(!UnitsData) throw new Error("Unit not found")
            let unitData
            UnitsData.units.forEach((unit) => {
                if (unit._id == req.params.id)
                    unitData = unit
            })
            if(!unitData) throw new Error("Unit not found")
            myHelper.resHandler(res, 200, true, unitData,"Unit fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static editUnit = async(req, res)=>{
        try
        {
            const UnitsData = await unitModel.findOne({
                _id: req.params.buildID,
                "units._id": req.params.id
            })
            if(!UnitsData) throw new Error("Unit not found")
            let unitData
            UnitsData.units.forEach((unit) => {
                if (unit._id == req.params.id)
                {
                    Object.keys(req.body).forEach((key,index) => {
                        unit[key] = Object.values(req.body)[index]
                    })
                    unitData = unit
                }
            })
            await UnitsData.save()
            myHelper.resHandler(res, 200, true, unitData,"Unit updated successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = Unit