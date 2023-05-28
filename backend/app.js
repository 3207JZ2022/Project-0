const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./config/passport-config');
const {passportInit} = require('./config/passport-config');
const fileUpload = require('express-fileupload');
const fs = require('fs');

require("./config/mongoose.js");

const flash = require('connect-flash');

const app= express();

const mySQLquery = require('./routes/mySQLquery.js');
const authentication= require('./routes/authentication.js')
const allUserAllow= require('./routes/allUserAllow.js')
const userProfile= require('./routes/userProfile.js')
const oneDay = 1000 * 60 * 60 * 24;


app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.use(cors({
        origin: ['http://localhost:3000'],
         methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        'credentials':true
    }   
));

app.use(session({
    secret: "Test",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
}))

app.use(passport.initialize());
app.use(passport.session());

passportInit();



app.use('/',authentication);
app.use('/', allUserAllow);
app.use('/', mySQLquery);
app.use('/', userProfile);
  

app.listen(8000, function(req, res){
    console.log("port 8000");
})

