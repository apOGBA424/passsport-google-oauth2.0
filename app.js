
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const User = require('./model/usermodel');
const database = require('./config/database/db')
const app = express();

// VARIABLES
const PORT = 3000;
let pageName;


// IMPORT PASSPORT GOOGLE STRATEGY FILE HERE
require('./config/strategies/googlestrategy');

// DATABASE CONNECTION
database;



/**
 * ---------- MIDDLEWARES------------
 */
// APP-LEVEL MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(session(
    { secret: process.env.SESSION_SECRET,
        resave: false,
      saveUninitialized: true,
      cookie: {secure: false}
    }
));

// ROUTE-LEVEL MIDDLEWARE
function isAccountValid(req, res, next) {
    /***************************************
     * ALLOW ONLY SIGN-IN USERS TO 
     * VISIT DASHBOARD PAGE OTHERWISE, REDIRECT TO
     * LOGIN PAGE.
     ****************************************/
    !req.user ? res.redirect('/login') : next();
}




// ACTIVATE THE PASSPORT STRATEGY HERE
app.use(passport.initialize());
app.use(passport.session());



// ---------------- ROUTES -----------------
app.get('/', (req, res)=>{
    pageName = 'HOME';
    const user_info = req.user;
    res.render('index', {pageName, user_info});
});

// PROTECTED ROUTE FOR AUTHENTICATED USERS ONLY
app.get('/user/dashboard', isAccountValid, (req, res)=>{
    pageName = 'HOME';
    const user_info = req.user;
    res.render('dashboard', {pageName, user_info});
});

app.get('/register', (req, res)=>{
    res.render('login');
});

app.get('/login', (req, res)=>{
    res.render('login');
});


// SETTING PASSPORT GOOGLE AUTH ROUTES
app.get('/auth/google', passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }));
app.get('/auth/google/redirect', passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/user/dashboard'
}
));

// LogOUT route
app.get('/logout', (req, res)=>{
    /**********************************
     * IMPLEMENT lOG-OUT FUNCTION BY DESTROYING
     * THE REQUEST SESSION LOGS AND REDIRECT USER TO
     * THE AUTHENTICATION ROUTE.
     */
    req.session.destroy();
    console.log("User has logged out");
    res.redirect("/")
});


app.listen(PORT, ()=>{
    console.log(`app live on http://localhost:${PORT}`)
})



/***************************************************** 
* RESOURCE GUIDE LINKS:
* - https://www.youtube.com/watch?v=Vd1P_S__6y8  ❤
* - https://www.youtube.com/watch?v=eDf91hihLpo&t=417s  ❤💯
* - https://www.youtube.com/watch?v=d-IToO3gLrM
* -
*******************************************************/
