const mongoose = require('mongoose');

const connectMongoDB=mongoose.connect('mongodb://127.0.0.1:27017/website',
{ useNewUrlParser: true, useUnifiedTopology: true});

const connectStatus = mongoose.connection;
connectStatus.on('error',()=>{
    console.log("MongoDB connection failed");
})
connectStatus.on('connected',()=>{
    console.log("MongoDB connection succeed");
})
module.exports=connectMongoDB;