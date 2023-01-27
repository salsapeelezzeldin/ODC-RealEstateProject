const router = require("express").Router()
const UserUnit = require('../app/controller/userunit.contoller')
const Auth = require("../app/middleware/auth.middleware")

//all user units
router.get("/allUserUnits/:id",Auth.authentication, UserUnit.allUserUnits)
//add user unit
router.post("/addUserUnit/:id",Auth.authentication, UserUnit.addUserUnit)
//single user unit
router.get("/singleUserUnit/:id/:unitID",Auth.authentication, UserUnit.singleUserUnit)
//edit user unit
router.post("/editUserUnit/:id/:unitID",Auth.authentication, UserUnit.editUserUnit)


module.exports = router