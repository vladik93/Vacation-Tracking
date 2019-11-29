var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

// Authentication Packages
var session = require('express-session');
var passport = require('passport');
require('./passport')(passport);


var con = require('./connection');

var app = express();
var port = process.env.PORT || 3000;



app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    preflightContinue: true
}));


app.use(flash());


app.use(session({
    secret: 'keyboard cat',
    name: 'express-session-storage',
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly: false}
    // cookie: {secure: true}
}));

var usersRouter = require('./routes/users');
var vacationsRouter = require('./routes/vacations');
app.use('/users', usersRouter);
app.use('/vacations', vacationsRouter);




app.listen(port, function() {
    console.log('Listening on port ' + port);
})