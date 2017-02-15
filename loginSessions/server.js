const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db');
require('./passport');

express()
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use(session({ secret: 'i love dogs', resave: false, cookie: { httpOnly: false }, saveUninitialized: false }))
  .use(passport.initialize())
  .use(passport.session())
  .get('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json({
      session: req.session,
      user: req.user,
      authenticated: req.isAuthenticated()
    });
  })
  .get('/login', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json({name: 'login again'});
  })
  .post('/login', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))
  .listen(3001)
;
