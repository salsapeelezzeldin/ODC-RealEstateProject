const router = require("express").Router()
const Building= require('../app/controller/building.contoller')
const Auth = require("../app/middleware/auth.middleware")

//all Buildings
router.get("/", Auth.authentication, Building.allBuildings)

//add Building
router.post("/addBuilding", Auth.authentication, Building.addBuilding)
//single Building
router.get("/singleBuilding/:id", Auth.authentication, Building.singleBuilding)
//edit Building
router.post("/editBuilding/:id", Auth.authentication, Building.editBuilding)
//delete Building
router.delete("/deleteBuilding/:id", Auth.authentication, Building.deleteBuilding)

module.exports = router