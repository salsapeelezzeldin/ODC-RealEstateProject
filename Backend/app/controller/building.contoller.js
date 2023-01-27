const buildingModel = require("../../db/models/building.model")
const myHelper = require("../../app/helper")

class Building{
    static allBuildings = async(req,res) => {
        try{
            const BuildingsData = await buildingModel.find()
            myHelper.resHandler(res, 200, true, BuildingsData, "Buildings fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static addBuilding = async(req,res) => {
        try{
            const BuildingData = new buildingModel(req.body)
            await BuildingData.generateUnits()
            await BuildingData.save()
            myHelper.resHandler(res, 200, true, BuildingData, "Building added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static singleBuilding = async(req, res)=>{
        try{
            const BuildingData = await buildingModel.findById(req.params.id)
            if(!BuildingData) throw new Error("Building not found")
            myHelper.resHandler(res, 200, true, BuildingData,"Building fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editBuilding = async(req, res)=>{
        try
        {
            let BuildingData = await buildingModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if(!BuildingData) throw new Error("Building not found")
            myHelper.resHandler(res, 200, true, BuildingData, "Building updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteBuilding = async(req, res)=>{
        try
        {
            let BuildingData = await buildingModel.findByIdAndDelete(req.params.id)
            if(!BuildingData) throw new Error("Building not found")
            myHelper.resHandler(res, 200, true, null, "Building deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = Building