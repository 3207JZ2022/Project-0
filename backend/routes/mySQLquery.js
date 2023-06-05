var express = require('express');
var router = express.Router();  
const connection = require('../config/mySQL.js')
const path = require('path');

router.get("/imgs/:displayName/:id", function(req, res){
    const src= req.params.displayName+"\\"+req.params.id;
    res.sendFile(path.join(__dirname,"../destination",src));
})

router.get("/news", function(req, res){
    connection.query(
        "SELECT title, descrip, author, releasedID FROM post GROUP BY releasedID ORDER BY date DESC LIMIT 1;",
        function(err, results, fields) {
            if(err){
                console.log(err);
                res.send([]);
                return;
            }
            res.send(results);
        }
    );
})

router.get('/popularproducts', function(req, res){
    var limit = 1;
    if(req.isAuthenticated()){
        limit=5;
    }
    connection.query(
        "SELECT title, descrip, author, releasedID FROM post GROUP BY releasedID ORDER BY likes DESC LIMIT ?;",
        [limit],
        function(err, results, fields) {
            if(err){
                console.log(err);
                res.send([]);
                return;
            }
            res.send(results);
        }
    );
})


router.get("/search/:query",function(req, res){
    const query= req.params.query;
    connection.query(
        "select author, title, descrip, releasedId from post where title like ?;",
        ['%'+query+'%'],
        function(err, results, fields){
            if(err){
                res.send([]);
                return;
            }
            res.send(results);
        }
    )
})
router.get("/imgs/:releasedID", function(req, res){
    const releasedID = req.params.releasedID;
    connection.query(
        "SELECT src FROM collection WHERE releasedID = ? ;", [releasedID],
        function(err, results, fields) {
            if(err){
                console.log(err);
                res.send([]);
                return;
            }
            if(results[0]){
                res.sendFile(path.join(__dirname,"../destination" ,results[0].src));
            }else{
                res.send();
            }
        }
    );
})



module.exports = router;