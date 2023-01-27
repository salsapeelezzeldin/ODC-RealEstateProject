const router = require("express").Router()
const Unit= require('../app/controller/unit.contoller')
const Auth = require("../app/middleware/auth.middleware")

//all Units
router.get("/", Auth.authentication, Unit.allUnits)
router.get("/allBuildingUnits/:id", Auth.authentication, Unit.allBuldingUnits)
router.get("/allProjectUnits/:id", Auth.authentication, Unit.allProjectUnits)

//router.get("/singleUnit/:id", Auth.authentication, Unit.singleUnit)
router.get("/singleUnit/:buildID/:id", Auth.authentication, Unit.singleUnit)

router.post("/editUnit/:buildID/:id", Auth.authentication, Unit.editUnit)

module.exports = router