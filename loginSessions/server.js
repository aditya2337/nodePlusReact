const express = require('express');
const session = require('express-session');

express()
  .use(session({ secret: 'i love dogs', resave: false, saveUninitialized: false }))
  .get('/', (req, res, next) => {
    res.send(req.session);
  })
  .get('/set', (req, res, next) => {
    req.session.name = 'aditya';
    res.send(req.session);
  })
  .listen(3000)
;
