var express = require('express');
var router = express.Router();  
const connection = require('../config/mySQL.js')
const path = require('path');

router.get("/news", function(req, res){
    connection.query(
        "SELECT title, descrip, src, id FROM news GROUP BY releasedID ORDER BY date DESC LIMIT 6;",
        function(err, results, fields) {
            if(err){
                res.send([]);
                return;
            }
            res.send(results);
        }
    );
})

router.get('/product', function(req, res){
    var limit = 2;
    if(req.isAuthenticated()){
        limit=5;
    }
    connection.query(
        'SELECT title, src, id FROM news GROUP BY releasedID ORDER BY likes DESC LIMIT ?',
        [limit],
        function(err, results, fields) {
            if(err){
                res.send([]);
                return;
            }
            res.send(results);
        }
    );
})

router.get("/product/:id", function(req, res){
    const id = req.params.id;
    connection.query(
        'SELECT * FROM news WHERE releasedID = (SELECT releasedID FROM news WHERE id = ?) ',
        [id],
        function(err, results, fields) {
            if(err){
                res.send([]);
                return;
            }
            res.send(results);
        }
    );  
})



router.get('/profileLikedImgs/:src', (req, res) => {
    const src=req.params.src;
    res.sendFile(path.join(__dirname,".." ,src));
})

router.get("/search/:query",function(req, res){
        const query= req.params.query;
        connection.query(
            "select title, descrip, src, id from news where title like ? group by releasedID;",
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

router.get('/profileLikedImgs/destination/:username/:src', (req, res) => {
    const username = req.params.username
    const src=req.params.src;
    res.sendFile(path.join(__dirname,"..","destination",username,src));
})

module.exports = router;