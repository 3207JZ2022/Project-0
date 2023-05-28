const passport = require('passport');
const User = require('./userSchema');
const LocalStrategy = require('passport-local');

const passportInit=()=>{
    passport.use(new LocalStrategy({usernameField:'email'},User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}

module.exports = passport;
module.exports.passportInit=passportInit;