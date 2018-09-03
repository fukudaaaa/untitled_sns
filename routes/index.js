const express = require("express")
const passport = require('passport')
const router  = express.Router({mergeParams: true})

const Tweet = require("../models/tweet");
const User = require("../models/user")


router.get("/register",function(req,res){
  res.render("register")
})

router.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
      passport.authenticate("local")(req, res, function(){
         res.redirect("/");
      })
  })
})


router.get("/",isLoggedIn, function(req,res){
  Tweet.find({},function(err,tweets){
    if(err){
      console.log(err)
    } else {
      const reversedTweets = tweets.slice().reverse()
      res.render("app",{tweets:reversedTweets})  
      }
  })
})

router.get("/login",function(req,res){
  res.render("login")
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}))

router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

 //MIDDLEWARE
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login")
}

module.exports = router;