const router = require("express").Router()
const User = require('../app/controller/user.contoller')
const Auth = require("../app/middleware/auth.middleware")

//auth
router.post("/register", User.register)
router.post("/login", User.login)

//logout
router.post("/logout",Auth.authentication, User.logOut)

//logout all
router.post("/logoutall",Auth.authentication, User.logOutAll)

//profile
router.get("/me",Auth.authentication, User.profile)

//all Users
router.get("/",Auth.authentication, User.allUsers)

//get single user
router.get("/single/:id",Auth.authentication, User.singleUser)

//activate & deactivate Status
router.post("/changeStatus",Auth.authentication, User.changeStatus)

//edit my profile
router.post("/editprofile",Auth.authentication, User.editProfile)

router.post("/adduser", User.adduser)

//edit other users
router.post("/edituser/:id",Auth.authentication, User.edituser)

//delete me
router.delete("/deleteProfile",Auth.authentication, User.deleteProfile)

//delete user
router.delete("/deleteUser/:id",Auth.authentication, User.deleteUser)

//add address
router.post("/addAddress",Auth.authentication, User.addAddress)

//delete address
router.delete("/deleteAddress/:id",Auth.authentication, User.deleteAddress)

//show all adresses
router.get("/showAddresses",Auth.authentication, User.showAddresses)

//show single adresses
router.get("/showAddress/:id",Auth.authentication, User.showAddress)


module.exports = router