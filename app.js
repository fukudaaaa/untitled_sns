const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const _ = require('lodash');

const port = process.env.PORT || 8000;

require('dotenv').config();
// const redis   = require("redis")
// const redisStore = require('connect-redis')(session)
// const client  = redis.createClient()

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 100000,
      autoRemove: 'native',
      collection: 'AllSessions'
    }),
    secret: 'The cake is lie',
    // store: new redisStore({ host: 'localhost', port: 8000, client: client,ttl :  10}),
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const tweetRoutes = require('./routes/tweets');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');

app.use('/', tweetRoutes);
app.use('/', indexRoutes);
app.use('/user', userRoutes);

app.listen(port, function() {
  console.log('server started');
});
