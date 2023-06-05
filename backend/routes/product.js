var express = require('express');
var router = express.Router();  
const connection = require('../config/mySQL.js')
const path = require('path');

router.get("/product/:releasedID",function(req, res){
    const releasedID= req.params.releasedID;
    connection.query(
        "SELECT author, title, descrip FROM post WHERE releasedID = ?;",
        [releasedID],
        function(err, results, fields){
            if(err){
                res.send([]);
                return;
            }
            res.send(results);
        }
    )
})

router.get("/productthumbs/:releasedID",function(req, res){
    const releasedID= req.params.releasedID;
    connection.query(
        "SELECT src FROM collection WHERE releasedId = ?;",
        [releasedID],
        function(err, results, fields){
            if(err){
                res.send([]);
                return;
            }
            res.send(results);
        }
    )
})

router.get("/productthumblist/:username/:id",function(req, res){
    const src=req.params.username+"\\"+req.params.id;
    connection.query(
        "SELECT src FROM collection WHERE src = ?;",
        [src],
        function(err, results, fields){
            if(err){
                console.log("err", err);
                res.send([]);
                return;
            }
            if(results[0]){
                res.sendFile(path.join(__dirname,"../destination" ,results[0].src));
            }else{
                res.send();
            }

        }
    )
})
module.exports=router;
