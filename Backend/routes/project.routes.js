const router = require("express").Router()
const Project= require('../app/controller/project.contoller')
const Auth = require("../app/middleware/auth.middleware")

//all Projects
router.get("/", Project.allProjects)

//add Project
router.post("/addProject", Auth.authentication, Project.addProject)
//single Project
router.get("/singleProject/:id", Project.singleProject)
//edit Project
router.post("/editProject/:id", Auth.authentication, Project.editProject)
//delete Project
router.delete("/deleteProject/:id", Auth.authentication, Project.deleteProject)

module.exports = router