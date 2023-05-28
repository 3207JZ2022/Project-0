const { error } = require('console');
var express = require('express');
var router = express.Router(); 
const path = require('path');

router.get("/imgs/destination/:username/:src", function(req, res){
    const src=req.params.src;
    const username=req.params.username;
    res.sendFile(path.join(__dirname,"../","destination",username,src), (error)=>{
        if(error) console.log("error", error)
    });
})
module.exports=router;

