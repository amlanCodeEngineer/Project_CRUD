const mongoose= require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

const userSchema = new mongoose.Schema({
    
    imageURL: { type: String, default: "" },
    email: { type: String, required: true , unique: true },
    name: { type: String, required: true },
    
});


module.exports = mongoose.model('User', userSchema);