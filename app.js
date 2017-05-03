var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var usersControllers = require('./controllers/users');
var passport = require('passport');
var mongoose = require('mongoose');
var itemsControllers = require('./controllers/items');
// var transactionsControllers = require('./controllers/transactions');

//Mongoose
mongoose.connect('mongodb://localhost/bukatoko');

//Passport
var Strategy = require('passport-local').Strategy;
passport.use(new Strategy(usersControllers.signin));

//Corse
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//Login
app.post('/signup', usersControllers.signup);
app.post('/signin', passport.authenticate('local', {
  session: false
}), function(req, res) {
  var user = req.user;
  res.send(user);
});

//Users
app.get('/users', usersControllers.getall);
app.post('/users', usersControllers.create);
app.delete('/users/:id', usersControllers.delete);
app.put('/users/:id', usersControllers.update);

//Item
app.get('/items/', itemsControllers.getall);
app.post('/items/', itemsControllers.create);
app.delete('/items/:id', itemsControllers.delete);
app.put('/items/:id', itemsControllers.update);

// //Transactions
// router.get('//', transactionsControllers.getall);
// router.post('/', transactionsControllers.create);
// router.delete('/:id', transactionsControllers.delete);
// router.put('/:id', transactionsControllers.update);

app.listen(3000)
