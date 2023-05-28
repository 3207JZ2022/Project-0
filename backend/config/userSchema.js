const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema=new mongoose.Schema(
    {   fName: String, 
        lName: String,
        username: String,
        password: String,
        googleId: String,
        likedItems: String,
    }
);
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('user', userSchema);



