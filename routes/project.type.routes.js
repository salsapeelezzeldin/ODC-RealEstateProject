const router = require("express").Router()
const ProjectType = require('../app/controller/project.type.contoller')
const Auth = require("../app/middleware/auth.middleware")

//all Project Types
router.get("/", Auth.authentication, ProjectType.allTypes)

//add ProjectType
router.post("/addType", Auth.authentication, ProjectType.addType)
//single ProjectType
router.get("/singleType/:id", Auth.authentication, ProjectType.singleType)
//edit ProjectType
router.post("/editType/:id", Auth.authentication, ProjectType.editType)
//delete ProjectType
router.delete("/deleteType/:id", Auth.authentication, ProjectType.deleteType)

module.exports = router