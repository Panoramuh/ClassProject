var userProf = require('./userProfileDB.js');
var userDB = require('./userDB.js');


userDB.createUser();
var test = userProf.getUserProfile();



test.userItems.forEach(function(element){
  console.log(element.item);
});
