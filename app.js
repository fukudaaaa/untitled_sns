const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require("passport-local-mongoose")
const User = require("./models/user")

mongoose.connect("mongodb://localhost:27017/untitled_sns", { useNewUrlParser: true })

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/assets"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(require("express-session")({
  secret: "The cake is lie",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const tweetRoutes = require("./routes/tweets")
const indexRoutes = require("./routes/index")
const userRoutes  = require("./routes/user")

app.use("/", tweetRoutes)
app.use("/",indexRoutes)
app.use("/user", userRoutes)

app.listen(8000, function(){
  console.log("server started")
})
