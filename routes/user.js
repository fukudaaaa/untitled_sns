const express = require("express")
const passport = require('passport')
const router  = express.Router({mergeParams: true})

const Tweet = require("../models/tweet");
const User = require("../models/user")

router.get("/:username", async function(req,res){
  try {
    const tweetOfUser = await Tweet.find({"author.username":req.params.username})
    const currentUser = await User.findByUsername(req.user.username)
    const user = await User.findByUsername(req.params.username)

    if (user === null) {
      throw "NOT FOUND"
    } 
    res.render("user",{user,tweetOfUser,currentUser})
  } catch (err) {
    console.log('ERROR!', err);
    res.render("404")
  }
})

router.post("/:username/follow", async function(req,res){
  const followedUser  = await User.findByUsername(req.body.id)
  const currentUser = await User.findByUsername(req.user.username)
  const followerArray =    currentUser.followers

//フォロー機能　
//フォローしてるかどうか検索して、既にしていたらフォローから外す
  function isExisted(){
    for(var i = 0;i<followerArray.length;i++){
      if(followerArray[i].username===req.body.id){
        return true
      } else if(req.user.username===req.body.id){
        console.log("自分")
        return true
      }
    }
    return false
  }
  if(! isExisted()){
    console.log("いない")
    currentUser.followers.push(followedUser)
    currentUser.save() 
    res.send("a")
  } else{
    console.log("いる、消した")
    for(var i=0;i<followerArray.length;i++){
      if(followerArray[i].username===followedUser.username){
      followerArray[i].remove()
      currentUser.save()
      res.send("b")
      break 
      }
      }
  }
 
})  

module.exports = router