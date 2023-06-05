var express = require('express');
var router = express.Router(); 
const User = require('../config/userSchema')
const connection = require('../config/mySQL.js')
const fs = require('fs');

router.get('/profile',(req,res) => {
    if(req.isAuthenticated()){
        res.redirect('http://localhost:3000/profile')
    }else{
        res.redirect('http://localhost:3000/login')
    }
})

router.post('/profile',(req,res) => {
    if(req.isAuthenticated()){
        res.send({username: req.user.username});        
    }else{
        res.send({});        
    }
})

router.post('/profile/favorite/:username',(req,res) => {
    if(req.isAuthenticated()){
        if(req.user.username=== req.params.username){
            User.findOne({ username: req.user.username })
            .then((foundUser)=>{
                if(foundUser){
                    if(!foundUser.likedItems){
                        res.send({noItems: true});
                        return;
                    }
                    const arr= foundUser.likedItems.substring(0,foundUser.likedItems.length - 1).split(" ");
                    connection.query(
                        "SELECT title, src, post.releasedId FROM post LEFT JOIN collection "+
                        "ON post.releasedId = collection.releasedId "+
                        "WHERE post.releasedId in (?) GROUP BY post.title;",
                        [arr],
                        function(err, results, fields) {
                            if(err){
                                res.send([]);
                                return;
                            }
                            res.send({data:results});
                        }
                    )
                }else{
                    res.send({data:null});
                }
            })
            .catch(err => {console.log(err)});
        }

    }else{
        res.send({});        
    }
});


router.post('/profile/userworks/:username', (req, res) => {
    if(!req.isAuthenticated()||(!req.user.username=== req.params.username)){
        res.send({handle: "No Items"});      
        return;  
    }
    connection.query(
        "SELECT title, src, post.releasedId FROM post LEFT JOIN collection "+
        "ON post.releasedId = collection.releasedId "+
        "WHERE author = ? GROUP BY post.releasedId;",
        [req.user.displayName],
        function(err, results, fields) {
            if(err){
                res.send({handle: "An Error Occurred, Please Try Again Later"});
                return;
            }
            res.send({data:results});
            return;
        }
    )
})

router.post('/profile/works/upload', (req, res) => {
    const file = req.files.file;
    // check if directory exist
    if (!fs.existsSync( "destination/"+req.user.displayName)) {
        fs.mkdirSync("destination/"+req.user.displayName);
    }

    connection.beginTransaction((err) =>{
        if(err) throw err;
        const author=req.user.displayName, 
        title = req.body.title,
        description = req.body.description,
        fileExtension = '.'+file.name.split('.').pop();
        connection.query(
            "INSERT INTO post (author, title, descrip)"
            +"SELECT ?,?,?;",
            [author, title, description],
            function(err, results, fields) {
                if(err){
                    res.send({handle: "An Error Occurred, Please Try Again Later"});
                    return;
                }
                connection.commit((err)=>{
                    if(err){
                        res.send({handle: "An Error Occurred, Please Try Again Later"});
                        return connection.rollback(() => {
                            throw err;
                        });
                    }
                    connection.query(
                        "INSERT INTO collection (src, releasedId) SELECT ?, ?",
                        [author+"\\"+results.insertId+"_p0"+fileExtension, results.insertId],
                        function(err, results1, fields) {
                            if(err){
                                res.send({handle: "An Error Occurred, Please Try Again Later"});
                                return;
                            }
                            file.mv("destination\\"+author+"\\"+results.insertId+"_p0"+fileExtension, (err) => {
                                if (err) {
                                  console.error(err);
                                  return res.status(500).send({handle: "An Error Occurred, Please Try Again Later"});
                                }else{
                                    res.send({});
                                }
                            }) 
                        }
                    )
                })
        })
    });   
});


router.patch('/updateUserEmail', (req, res) => {
    if(!req.isAuthenticated()){
        res.redirect('/login');
        return;
    }
    const newEmail = req.body.newEmail;
    User.findOne({email: newEmail})
    .then((foundUser)=>{
        if(foundUser){
            res.send({handle:"This E-mail is Already Registered"})
            return;
        }
        User.findOneAndUpdate({username: req.user.username}, {$set:{username: newEmail}})
        .then((result)=>{
            res.send({success:"Updated the E-mail"});
        })
        .catch(err=>{console.log(err)})
    })
    .catch(err => {console.log(err)});
})



router.patch('/updateUserPassword', (req, res) => {
    if(!req.isAuthenticated()){
        res.redirect('/login');
        return;
    }
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    User.findOne({username: req.user.username})
    .then((foundUser)=>{
        if(foundUser){
            foundUser.changePassword(oldPassword, newPassword, function(err){
                if(err){
                    res.send({handle:"Incorrect Old Password"})
                    return;
                };
                res.send({success:"Updated Password"});
                req.logout(function(err) {
                    if (err) {return next(err);} 
                  });
            });
        }else{
            res.send({handle:"Username Was Changed"})
            return;
        }
    })
    .catch(err => {console.log(err)});
})



module.exports=router;
