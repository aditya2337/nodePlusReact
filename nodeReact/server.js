const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('./model/db');
const ObjectId = require('mongodb').ObjectId;

express()
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())

  .get('/', (req, res) => {
    mongo.db.collection('nodeUsers').find().toArray((err, users) => {
      if (err) res.sendStatus(400);
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json({title: 'All Users',
        users});
    });
  })

  .get('/tweets/:user_id', (req, res, next) => {
    const id = parseInt(req.params.user_id);
    mongo.db.collection('tweets').find({id}).toArray((err, tweets) => {
      if (err) res.sendStatus(400);
      console.log(req.params.user_id);
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json({title: 'My Users Tweets',
        tweets});
    });
  })

















  .get('/users', (req, res, next) => {
    mongo.db.collection('nodeUsers')
    .find()
    .toArray((err, users) => {
      if (err) res.send(err);
      res.send(users);
    });
  })
  .get('/users/:id', (req, res) => {
    var id = req.params.id;
    mongo.db.collection('nodeUsers')
    .findOne({_id: ObjectId(id)}, (err, user) => {
      if (err) res.send(err);
      res.send(user);
    });
  })
  .post('/users', (req, res, next) => {
    var username = req.body.username;
    var id = req.body.id;
    mongo.db.collection('nodeUsers')
    .insert({username, id}, (err, doc) => {
      if (err) res.send(err);
      res.send(doc);
    });
  })
  .put('/users/:id', (req, res) => {
    var {id} = req.params;
    mongo.db.collection('nodeUsers')
    .update({_id: ObjectId(id)}, {username: req.body.username}, (err, user) => {
      if (err) res.send(err);
      res.send(user);
    });
  })
  .delete('/users/:id', (req, res) => {
    var {id} = req.params;
    mongo.db.collection('nodeUsers')
    .remove({_id: ObjectId(id)}, (err, user) => {
      if (err) res.send(err);
      console.log(user);
      if (user === 0) res.sendStatus(400);
      res.sendStatus(200);
    });
  })
  .listen(3001)
;
