var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var router = express.Router();
var _ = require('underscore');
const ejsLint = require('ejs-lint');


var ItemDB = require('../models/new_item_db.js');
var UserDB = require('../models/new_user_db.js');
var Feedback = require('../models/new_feedback_db.js');
var Offer = require('../models/offer.model.js');

var app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', '../views');

app.use(cookieParser());
app.use(session({
  name: 'i_am_cookie',
  secret: 'I hope this works!',
  resave: false,
  saveUninitialized: false
  }));

app.use("/", router);

//database connection
const mongoose = require('mongoose');

let uri = 'mongodb://testuser:test123@ds029821.mlab.com:29821/card_trade';

mongoose.connect(uri);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


//middleware for sign in status
router.use(function(req, res, next){
    var userID = "";
    if(_.isUndefined(req.session.theUser)){
        userID = "Not Signed In."
    }else{
        userID = req.session.theUser.userID;
    }

    //console.log("THIS IS SOME MIDDLEWARE SENT TO EACH PAGE....");

    //saves the email to req.email and sends all pages without needing to pass it
    // in res.render as an object
    req.userID = userID;
    res.locals.userID = req.userID;

    next();
});

  //easy to use session variable
//if(userSess == undefined){   //if no user exists, do these things

  app.get('/myItems', async function(req, res, next){
/* THIS NEEDS TO GO, JUST GRAB A USER AND CREATE THE SESSION LOGIC AS IF CLICKING
  THE LINK SIGNS YOU IN */
  var allUsers = await UserDB.getAllUsers();
  req.session.theUser = allUsers[0]; // user from the Database
  var theUser = req.session.theUser; // session object
  var userItems = await ItemDB.getUserItems(theUser._id);
  var currentProfile = req.session.currentProfile = theUser;


  console.log("Proof this item exists: " + userItems[0].itemName);
  console.log("Proof this object exists: " + currentProfile.firstName);
  res.render('myItems',{currentProfile: currentProfile, items: userItems});
  });


  app.post('/update', function(req, res, next){
    console.log(req.body.update);
    if(typeof req.session.theUser !== "undefined"){

    }
  });



  /*app.post('/myItems/:action', function(req, res, next){
    if(typeof req.session.theUser !== undefined && req.session.theUser.userID == user.userDB[0].userID){ //if the session has a user and its valid
    switch(req.body.action){ //check the action parameter???
      case "update":
        if(typeof req.params.theItem !== undefined && req.params.theItem > 0 && req.params.theItem < 7){
          console.log("Item exists and matches item code format.");
        }
        else{
          console.log("Item does not exist or invalid item code was given.");
          res.render('myItems');
        }
      break; //end of update case

    }//end of switch
  }//end of if
  });
*/

//}

/*  app.post('/mySwaps', function(req,res,next){
      if(req.body.name == "Accept"){

      }
      else if(req.body.name == "Update"){
        if(req.params.theItem > 0 && req.params.theItem < 7){
          if(req.path == ".././views/mySwaps"){

          }
        }
        else{

        }//end of item code validation
      }//end of update validation
      else if(req.body.name == "Reject"){

      }
      else if(req.body.name == "Withdraw"){

      }
      else if(req.body.name == "Offer"){

      }
      else if(req.body.name == "Delete"){

      }
      else if(req.body.name == "Signout"){

      }
      else{
        res.render('mySwaps');
      }
  });
  //}
*/
