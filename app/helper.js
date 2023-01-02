const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

class MyHelper{
    static resHandler = (res, statusCode, apiStatus, data, message)=>{
        res.status(statusCode).send({
            apiStatus,
            data, 
            message
        })
    }
    static getDates(startDate, stopDate, months) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(months, 'months');
        }
        return dateArray;
    }
    static dateCal = (date)=>{
        let date_ob = new Date(date);
        let day = date_ob.getDate();
        let month = date_ob.getMonth();
        let year = date_ob.getFullYear();
        // prints date & time in YYYY-MM-DD format
        return (year + "-" + month + "-" + day);
    }
    static dateCalc = (date)=>{
        let date_ob = new Date(date);
        let day = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        // prints date & time in YYYY-MM-DD format
        return (year + "-" + month + "-" + day);
    }
}
module.exports=MyHelper