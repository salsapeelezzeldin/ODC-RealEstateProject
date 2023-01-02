const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const helper = require("../../app/helper")

const userSchema = mongoose.Schema({
    fName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 3,
        maxLength:20
    }, 
    lName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 3,
        maxLength:20,
        required:true
    }, 
    roleName:{
        type:String,
        required: true,
        ref:"Role"
    },
    age:{
        type:Number,
        min:21,
        max:60,
        default:21
    }, 
    email:{
        type:String, 
        trim:true,
        lowercase:true,
        required:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format")
            }
        }
    }, 
    status:{
        type:Boolean,
        default: false
    }, 
    image:{
        type:String, 
        trim:true
    }, 
    password:{
        type:String, 
        trim:true,
        minLength: 5,
        required:true
    }, 
    gender:{
        type:String, 
        trim:true,
        lowercase:true,
        enum: ["male", "female"]
    }, 
    dOfBirth:{
        type: Date
    }, 
    phoneNum:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value, "ar-EG"))
                throw new Error ("invalid number")
        }
    },
    addresses: [{
            addressType:{
                type:String, 
                trim:true,
                required:true
            },
            details:{}
    }],
    tokens:[{
        token:{ type:String, required:true}
    }],
    units: [{
        unitid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Building"
        },
        buildingid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Building"
        },
        unitPrice:{
            type:Number
        },
        remainingPrice:{
            type:Number
        },
        deliveryDate:{
            type:Date
        },
        paymentStartDate:{
            type:Date
        },
        paymentPeriod:{
            type:Number
        },
        paymentSystem:{
            type:String, 
            trim:true,
            lowercase:true,
            enum: ["cash", "every3months","every6months"]
        },
        payments: [{
            payment:{
                type:Number
            },
            details:{
                type:String, 
                trim:true
            },
            dueDate:{
                type:Date
            },
            paymentStatus:{
                type:Boolean,
                default: false //true => paid, false => not paid
            },
            paidDate:{
                type:Date
            }
        }],
    }]
}, {
    timestamps:true
})

userSchema.pre("save", async function(){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 8)
    }
})
userSchema.statics.loginUser = async(email, password) => {
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invalid email")
    const validatePassword = await bcryptjs.compare(password, userData.password)
    if(!validatePassword) throw new Error("invalid password")
    return userData
}
userSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.__v
    delete data.password
    delete data.tokens
    return data
}
userSchema.methods.generateToken = async function(){
    const userData = this
    const token = jwt.sign({_id: userData._id}, process.env.tokenPassword)
    userData.tokens = userData.tokens.concat({token})
    await userData.save()
    return token
}
userSchema.methods.generatePayments = async function(index){
    const userData = this
    if(userData.units[index].payments)
        userData.units[index].payments = []

    if(userData.units[index].paymentSystem == "cash"){
        payment = userData.units[index].unitPrice
        dueDate = moment(userData.units[index].paymentStartDate).format('YYYY-MM-DD')
        userData.units[index].payments = userData.units[index].payments.concat({payment, dueDate})
    }
    else{
        let months, payrounds
        if(userData.units[index].paymentSystem == "every3months"){
            months = 3
            payrounds = 4        
        }
        else if(userData.units[index].paymentSystem == "every6months"){
            months = 6
            payrounds = 2        
        }
        //mo2adam
        payment = userData.units[index].unitPrice * 10 / 100
        dueDate = moment(userData.units[index].paymentStartDate).format('YYYY-MM-DD')
        userData.units[index].payments = userData.units[index].payments.concat({payment, dueDate})

        //payments dates
        const startDate = moment(userData.units[index].paymentStartDate).add(months, 'months')
        const stopDate = moment().add(userData.units[index].paymentPeriod+1, 'years')
        const arrayOfDates = helper.getDates(startDate, stopDate, months)

        //start payments
        for (let i = 0; i < userData.units[index].paymentPeriod*payrounds; i++) {
            payment = (userData.units[index].unitPrice - userData.units[index].unitPrice * 10 / 100) / userData.units[index].paymentPeriod / payrounds
            dueDate = arrayOfDates[i]
            userData.units[index].payments = userData.units[index].payments.concat({payment, dueDate})
        }
    }
    userData.units[index].payments.forEach(pay => {
        if (pay.paymentStatus)
            userData.units[index].remainingPrice = userData.units[index].unitPrice - pay.payment
    })
    await userData.save()
}

const User = mongoose.model("User", userSchema)
module.exports=User