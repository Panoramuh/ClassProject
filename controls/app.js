var express = require('express');
var app = express();


var itemDB = require('../models/new_item_db.js');
var profileController = require('./ProfileController.js');

const mongoose = require('mongoose');

mongoose.connect('mongodb://testuser:test123@ds029821.mlab.com:29821/card_trade');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

mongoose.Promise = global.Promise;

db.once('open', function() {
  // we're connected!
  console.log("Mongoose connected");
});


//Set View Engine to render EJS files
app.set('view engine', 'ejs');
app.set('views', '../views');

//static resources
app.use("/resources", express.static("../resources"));
app.use("/images", express.static("../resources/images"));
app.use(profileController);


app.get('/', function(req, res){
  res.render('index');
});

app.get('/categories', async function(req, res){
 var allItems = await itemDB.getAllItems();
  console.log("Showing all the item choices.");
  res.render('categories', {allItems: allItems});
});


//Important stuff for AS2
app.get('/item/:id', async function(req, res, next){
  //Get access to the hard coded database

  //Get the item ID from the GET reqeuest
  console.log("The request ID is: " + req.params.id);
  //Get the item for the database and wait for the object to get there
  var dbItem = await itemDB.getItem(req.params.id);
  res.render('item',{thisCard: dbItem})
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact');
});
app.get('/item', function(req, res){
  res.render('item');
});
//app.get('/myItems', function(req, res){
//  res.render('myItems');
//});
//app.get('/mySwaps', function(req, res){
//  res.render('mySwaps');
//});
app.get('/swap', function(req, res){
  res.render('swap');
});


function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}



app.listen(3000);
