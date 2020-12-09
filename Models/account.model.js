const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Account = Schema({
    mobile_number:{
        type:String,
        required: true,
        unique: true,
    },
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
});
module.exports = mongoose.model("Account",Account);