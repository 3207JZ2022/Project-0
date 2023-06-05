var express = require('express');
var router = express.Router(); 
const passport = require('../config/passport-config');
const User = require('../config/userSchema')
const connection = require('../config/mySQL.js')


router.get('/register',(req,res)=>{
    res.redirect('http://localhost:3000/register');
});

router.post('/register', async (req,res)=>{
    User.findOne({displayName:req.body.displayName}).then(foundUser=>{
        if(foundUser) {
            res.send({handle:"This Display Name Is Taken."})
            return;
        };

        const newUser = new User({
            fName: req.body.fName,
            lName: req.body.lName,
            username: req.body.email,
            displayName: req.body.displayName
        })

        User.register(newUser, req.body.password, function(err,user){
            if(err) {
                res.send({ handle: err.message})
            }
            else{
                res.redirect("http://localhost:3000/login");
            }
        });
    })
});

router.get('/login', (req,res) => {
    res.redirect('http://localhost:3000/login')
});

router.post('/login',
     passport.authenticate('local', {
        successRedirect:'http://localhost:3000',
        failureFlash: "Invalid username or password"
    })
);

router.post('/isAuthenticate', function(req, res) {
    if(req.isAuthenticated()){
        res.status(200).send({redirect:req.body.frontendAddress,loginState:true})  
    }else{
        res.send({loginState:false});
    }
})

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) {
        res.send({loggedOut:false} );
        return next(err);
      } 
      res.send({loggedOut:true});
    });
});


router.post('/user/likes/:releasedId', (req, res) => {
    if(!req.isAuthenticated()){
        res.send({like:false})
        return;
    }
    const releasedId = req.params.releasedId;
    User.findOne({username: req.user.username})
    .then((foundUser)=>{
        if(foundUser&&foundUser.likedItems){
            let regex = new RegExp("\\b" + releasedId + "\\b\\s");
            if (foundUser.likedItems.match(regex)){
                res.send({like:true});
            }else{
                res.send({like:false});
            }
        }
    })
})

router.patch('/user/likes/:releasedId',function(req, res){
    if(!req.isAuthenticated()){
        res.send({requireLogin: true});
        return;
    }
    const releasedId = req.params.releasedId;
    User.findOne({username: req.user.username})
    .then((foundUser)=>{
        if(!foundUser){
            res.send({sessionUnverify: true})
            return;
        }
        let likedItems = foundUser.likedItems;
        if(!likedItems){
            User.findOneAndUpdate(
                { username: req.user.username },
                { likedItems: releasedId+" " },
                { new: true, upsert: true })
                .then((result)=>{
                    res.send({like:true})
                    changeLikes(releasedId, 1);
                })
                .catch((error)=>{console.log(error)});
            return;
        }
      
        let regex = new RegExp("\\b" + releasedId + "\\b\\s");
        if (likedItems.match(regex)) {
            likedItems = likedItems.replace(regex, "");
            User.findOneAndUpdate({username: req.user.username},{likedItems: likedItems})
                .then((result)=>{
                    res.send({like:false});
                    changeLikes(releasedId, -1);
                })  
                .catch((error)=>{console.log(error)});
        } else {
            likedItems = likedItems + releasedId+ " ";  
            User.findOneAndUpdate({username: req.user.username},{likedItems: likedItems})
                .then((result)=>{
                    res.send({like:true})
                    changeLikes(releasedId, 1);
                })
                .catch((error)=>{console.log(error)});
            }
    })
    .catch((error)=>{res.send({error:error})});
})

function changeLikes(releasedID, increment){
    connection.query(
        "SELECT likes FROM post WHERE releasedId= ?;", [releasedID],
        function(err, results, fields) {
            if(err){
                console.log(err);
                return;
            }
            connection.query(
                "UPDATE post SET LIKES = ? WHERE releasedId = ?",
                [results[0].likes + increment, releasedID],
                function(err, results, fields) {
                    if(err){
                        console.log(err);
                        return;
                    }
                }
            );
        }
    );
}
module.exports=router;