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
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", async function(req,res){
  const tweets  = await Tweet.find({})
  const reversedTweets = tweets.reverse()
  res.render("app",{tweets})
})

app.post("/", function(req,res){

  Tweet.create(req.body)
   res.send(req.body)
})

app.listen(8000, function(){
  console.log("server started")
})
