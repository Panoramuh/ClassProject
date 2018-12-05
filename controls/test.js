var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});
const { check, validationResult } = require('express-validator/check');

var ItemDB = require("../models/new_item_db.js");
var UserDB = require("../models/new_user_db.js");

app.set("view engine", "ejs");
app.set("views", "../views");

var mongoose = require('mongoose');
mongoose.connect('mongodb://testuser:test123@ds029821.mlab.com:29821/card_trade', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Mongoose connected :)");
});



app.get('/', async function(req, res, next) {

//  var test;

//Test addition
//const itemPromise = await ItemDB.getItem('1');
//const allItems = await ItemDB.getAllItems();


//you only need to JSON.parse if you use a "find" DB method. If you do "findOne" you can just use the itemPromise because
// it actually returns the value you need without needing to parse it.
//var item = JSON.parse(JSON.stringify(userPromise));
//var item = JSON.parse(JSON.stringify(allItems));
//console.log(item);
  var userItem = await ItemDB.getAllItems();
  var user = await UserDB.getAllUsers();

  var userItems = await ItemDB.getUserItems(user[0]._id);
  console.log(userItems);

  //await ItemDB.addOwnership(userItem[0]._id, user[0]._id);
  //await ItemDB.addOwnership(userItem[2]._id, user[0]._id);



  res.render("test", {test: user[0], items: userItems});

});


app.listen(3000);
