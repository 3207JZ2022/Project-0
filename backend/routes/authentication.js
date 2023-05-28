var express = require('express');
var router = express.Router(); 
const passport = require('../config/passport-config');
const User = require('../config/userSchema')

router.get('/register',(req,res)=>{
    res.redirect('http://localhost:3000/register');
});

router.post('/register', async (req,res)=>{
    const newUser = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.email,
    })  
    User.register(newUser, req.body.password, function(err,user){
        if(err) {
            res.send({ handle: err.message})
        }
        else{
            res.redirect("http://localhost:3000/login");
        }
    });
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


router.post('/user/likes/:id', (req, res) => {
    if(!req.isAuthenticated()){
        res.send({like:false})
        return;
    }
    const id = req.params.id;
    User.findOne({username: req.user.username})
    .then((foundUser)=>{
        if(foundUser&&foundUser.likedItems){
            let regex = new RegExp("\\b" + id + "\\b\\s");
            if (foundUser.likedItems.match(regex)){
                res.send({like:true});
            }else{
                res.send({like:false});
            }
        }
    })
})

router.patch('/user/likes/:id',function(req, res){
    if(!req.isAuthenticated()){
        res.send({requireLogin: true});
        return;
    }
    const id = req.params.id;
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
                { likedItems: id+" " },
                { new: true, upsert: true })
                .then((result)=>{
                    res.send({like:true})
                })
                .catch((error)=>{console.log(error)});
            return;
        }
      
        let regex = new RegExp("\\b" + id + "\\b\\s");
        if (likedItems.match(regex)) {
            likedItems = likedItems.replace(regex, "");
            User.findOneAndUpdate({username: req.user.username},{likedItems: likedItems})
                .then((result)=>{
                    res.send({like:false});
                })  
                .catch((error)=>{console.log(error)});
        } else {
            likedItems = likedItems + id+ " ";  
            User.findOneAndUpdate({username: req.user.username},{likedItems: likedItems})
                .then((result)=>{
                    res.send({like:true})
                })
                .catch((error)=>{console.log(error)});
            }
    })
    .catch((error)=>{res.send({error:error})});
})

module.exports=router;