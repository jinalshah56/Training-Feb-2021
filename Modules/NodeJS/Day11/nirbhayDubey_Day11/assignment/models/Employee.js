const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const EmployeeSchema=new Schema({
    EmpId:{
        type:Number,
        required:true
    },
    AddressLine1:{
        type:String,
        required:true
    },
    AddressLine2:{
        type:String
    },
    AddressLine3:{
        type:String
    },
    assignments:{
        type:[Number],
        required:true
    },
    CitizenshipId:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    DateOfBirth:{
        type:String,
        required:true
    },
    DriversLicenseExpirationDate:{
        type:String,
        required:true
    },
    DriversLicenseId:{
        type:String,
        required:true
    },
    DriversLicenseIssuingCountry:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    HireDate:{
        type:String,
        required:true
    },
    HomePhoneCountryCode:{
        type:String,
        required:true
    },
    HomePhoneNumber:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    LastUpdateDateTime:{
        type:String,
        required:true
    },
    MaritalStatus:{
        type:String,
        required:true
    },
    MiddleName:{
        type:String,
        required:true
    }
});

module.exports = Employee = mongoose.model('employee',EmployeeSchema);