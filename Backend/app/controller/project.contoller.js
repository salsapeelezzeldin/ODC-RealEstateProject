const projectModel = require("../../db/models/project.model")
const myHelper = require("../../app/helper")

class Project{
    static allProjects = async(req,res) => {
        try{
            const ProjectsData = await projectModel.find()
            myHelper.resHandler(res, 200, true, ProjectsData, "Projects fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static addProject = async(req,res) => {
        try{
            const ProjectData = new projectModel(req.body)
            await ProjectData.save()
            myHelper.resHandler(res, 200, true, ProjectData, "Project added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static singleProject = async(req, res)=>{
        try{
            const ProjectData = await projectModel.findById(req.params.id)
            if(!ProjectData) throw new Error("Project not found")
            myHelper.resHandler(res, 200, true, ProjectData,"Project fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editProject = async(req, res)=>{
        try
        {
            let ProjectData = await projectModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if(!ProjectData) throw new Error("Project not found")
            myHelper.resHandler(res, 200, true, ProjectData, "Project updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteProject = async(req, res)=>{
        try
        {
            let ProjectData = await projectModel.findByIdAndDelete(req.params.id)
            if(!ProjectData) throw new Error("Project not found")
            myHelper.resHandler(res, 200, true, null, "Project deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = Project