const express = require("express")
const cors = require("cors")
const app = express()

require("../db/connect")

app.use(cors())
app.use(express.json())

const urlRoutes = require("../routes/url.routes")
const roleRoutes = require("../routes/role.routes")
const userRoutes = require("../routes/user.routes")
const projectTypeRoutes = require("../routes/project.type.routes")
const projectRoutes = require("../routes/project.routes")
const buildingRoutes = require("../routes/building.routes")
const unitRoutes = require("../routes/unit.routes")
const userUnitRoutes = require("../routes/userunit.routes")

app.use("/api/url/", urlRoutes)
app.use("/api/role/", roleRoutes)
app.use("/api/user/",  userRoutes)
app.use("/api/projectType/",  projectTypeRoutes)
app.use("/api/project/",  projectRoutes)
app.use("/api/building/",  buildingRoutes)
app.use("/api/unit/",  unitRoutes)
app.use("/api/user/",  userUnitRoutes)

app.all("*", (req, res)=> {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})

module.exports=app