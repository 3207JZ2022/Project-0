var express = require('express');
var router = express.Router(); 
const User = require('../config/userSchema')
const connection = require('../config/mySQL.js')
const path = require('path');
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


router.post('/profile/:username',(req,res) => {
    if(req.isAuthenticated()){
        if(req.user.username=== req.params.username){
            User.findOne({ username: req.user.username })
            .then((foundUser)=>{
                if(foundUser){
                    if(!foundUser.likedItems){
                        res.send({noItems: true});
                    }else{
                        const arr= foundUser.likedItems.substring(0,foundUser.likedItems.length - 1).split(" ");
                        connection.query(
                            "SELECT title, id, src FROM news WHERE id in (?)",
                            [arr],
                            function(err, results, fields) {
                                if(err){
                                    res.send([]);
                                    return;
                                }
                                res.send({data:results});
                            }
                        )
                        }
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
        "SELECT title, id, src FROM news WHERE author = ?;",
        [req.user.username],
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
    const description = req.body.description;  
    // check if file or directory exist
    if (!fs.existsSync( "destination/"+req.user.username)) {
        fs.mkdirSync("destination/"+req.user.username);
    }
    if(fs.existsSync( "destination/"+req.user.username+"/"+file.name)){
        res.send({handle:"A Duplicate File Name Exists"});
        return;
    }
    // insert into mySQL
    connection.beginTransaction((err) =>{
        if(err) throw err;
        const username=req.user.username, title = path.parse(file.name).name, 
        filePath= "destination\\"+req.user.username+"\\", fileExtension = '.'+file.name.split('.').pop();
        connection.query(
            "INSERT INTO news (author, title, descrip, src, id, releasedID)"
            +"select ?,?,? ,CONCAT(CONCAT(?, CONCAT(MAX(releasedID) +1, '_0') ), ?), CONCAT(MAX(releasedID) +1, '_0'), MAX(releasedID) +1     FROM news",
            [username, title, description, filePath, fileExtension],
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
                        "SELECT id FROM news where title = ?",
                        [title],
                        function(err, results, fields) {
                            if(err){
                                res.send({handle: "An Error Occurred, Please Try Again Later"});
                                return;
                            }
                            file.mv("destination/"+req.user.username+"/"+results[0].id+fileExtension, (err) => {
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
    User.findOne({username: newEmail})
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
                    res.send({handle:"incorrect old password"})
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
