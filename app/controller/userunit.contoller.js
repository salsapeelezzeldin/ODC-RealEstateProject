const userModel = require("../../db/models/user.model")
const buildingModel = require("../../db/models/building.model")
const myHelper = require("../../app/helper")

class UserUnit{
    //user units
    static allUserUnits = async(req,res)=>{
        try
        {
            let userData = await userModel.findById(req.params.id)
            if(!userData) throw new Error("user not found")
            if (!userData.units) throw new Error("units not found")
            myHelper.resHandler(res, 200, true, userData.units, "user units fetched")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static addUserUnit = async(req,res)=>{
        try
        {
            //check if user exists
            let userData = await userModel.findById(req.params.id)
            if(!userData) throw new Error("user not found")
            //check if unit already bought
            let usersData = await userModel.find()
            usersData.forEach(user => {
                user.units.forEach(unit => {
                    if(unit.unitid == req.body.unitid)
                        throw new Error("unit already bought")
                });
            });
            //check if building exists
            let buildingData = await buildingModel.findById(req.body.buildingid)
            if(!buildingData) throw new Error("building not found")
            //check if unit exists
            let unitData 
            buildingData.units.forEach(unit => {
                if(unit._id == req.body.unitid){
                    unitData = unit
                    unit.unitStatus = false
                }
            });
            if(!unitData) throw new Error("unit not found")
            //add unit to user units
            if (!userData.units) userData.units =[]
            userData.units.push(req.body)
            //generate payments
            await userData.generatePayments(userData.units.length - 1)
            await buildingData.save()
            myHelper.resHandler(res, 200, true, userData, "user unit added")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static singleUserUnit = async(req,res)=>{
        try
        {
            let userData = await userModel.findById(req.params.id)
            if(!userData) throw new Error("user not found")
            if (!userData.units) throw new Error("unit not found")
            let unitData 
            userData.units.forEach(unit => {
                if(unit.unitid == req.params.unitID)
                    unitData = unit
            });
            if (!unitData) throw new Error("unit not found")
            myHelper.resHandler(res, 200, true, unitData, "user unit fetched")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editUserUnit = async(req,res)=>{
        try
        {
            let userData = await userModel.findById(req.params.id)
            if(!userData) throw new Error("user not found")
            if (!userData.units) throw new Error("unit not found")
            let unitData,index
            userData.units.forEach((unit,indx) => {
                if(unit.unitid == req.params.unitID){
                    Object.keys(req.body).forEach((key,index) => {
                        unit[key] = Object.values(req.body)[index]
                    })
                    unitData = unit
                    index = indx
                }
            });
            if (!unitData) throw new Error("unit not found")
            await userData.save()
            await userData.generatePayments(index)
            myHelper.resHandler(res, 200, true, unitData, "user unit fetched")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = UserUnit