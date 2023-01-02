const projectTypeModel = require("../../db/models/project.type.model")
const myHelper = require("../../app/helper")

class ProjectType{
    static allTypes = async(req,res) => {
        try{
            const typesData = await projectTypeModel.find()
            myHelper.resHandler(res, 200, true, typesData, "Project types fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static addType = async(req,res) => {
        try{
            const typeData = new projectTypeModel(req.body)
            await typeData.save()
            myHelper.resHandler(res, 200, true, typeData, "Project type added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static singleType = async(req, res)=>{
        try{
            const typeData = await projectTypeModel.findById(req.params.id)
            if(!typeData) throw new Error("type not found")
            myHelper.resHandler(res, 200, true, typeData,"Project type fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editType = async(req, res)=>{
        try
        {
            let typeData = await projectTypeModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if(!typeData) throw new Error("type not found")
            myHelper.resHandler(res, 200, true, typeData, "Project type updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteType = async(req, res)=>{
        try
        {
            let typeData = await projectTypeModel.findByIdAndDelete(req.params.id)
            if(!typeData) throw new Error("type not found")
            myHelper.resHandler(res, 200, true, null, "Project type deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = ProjectType