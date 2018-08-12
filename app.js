const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/untitled_sns", { useNewUrlParser: true })

const tweetSchema = new mongoose.Schema({
  content:String
})

const Tweet = mongoose.model("Tweet",tweetSchema)

app.set("view engine", "ejs")

app.use(express.static(__dirname + "/assets"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
  const promise = Tweet.find({})
  promise.then(function(tweets){
    console.log(tweets)
  })
  Tweet.find({}, function(err,tweets){
    if(err){
      console.log(err)
    } else{
      res.render("app",{tweets:tweets})
    }
  })
  // res.render("app", {tweet: ""})

})

app.post("/tweet", function(req,res){

  console.log(req.body)
  Tweet.create(req.body)
  Tweet.find({}, function(err,tweets){
    if(err){
      console.log(err)
    } else{
      res.render("app",{tweets:tweets})
      console.log(tweets)
    }
  })   
})

app.listen(8000, function(){
  console.log("server started")
})
