
var mongoose=require('mongoose');


const contactusSchema = new mongoose.Schema({
    imgurl: String,
    address: String
})
 
const Contactus =  mongoose.model("Contactus", contactusSchema)
module.exports = Contactus;