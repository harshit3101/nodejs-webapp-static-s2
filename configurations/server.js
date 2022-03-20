const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const storeClient = require('../configurations/db.js');
const MongoStore = require('connect-mongo');
const user = require('../models/user.js');
const passport = require('passport');

const app = express();
const port = (process.env.PORT || 8080);


app.use(session({
    secret: 'Very Easy Secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({clientPromise: storeClient.connect()}),
    cookie: { maxAge: 60* 60 * 1000 } // 1 hour
  }));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(user.createStrategy());

// To use with sessions
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(express.static('static'));

app.listen(port, ()=> {
    console.log("Server started at port"+ port);
});

module.exports = app;