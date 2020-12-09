const mongoose = require("mongoose");
const Image = new mongoose.Schema({ 
    image:String,
});
module.exports = mongoose.model("Image",Image);