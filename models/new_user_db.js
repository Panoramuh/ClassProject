var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  firstName:{
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return (value.length > 2 && value.toLocaleLowerCase() !== 'none');
      },
      message: 'Name should be of 2 or more letters.'
    },
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  address1:{
    type: String,
    required: true,
  },
  address2:{
    type: String
  },
  city:{
    type: String,
    default:'Charlotte'
  },
  state:{
    type: String,
    default:'NC'
  },
  zipCode:{
    type: String,
    default:'28262'
  },
  country:{
    type: String,
    default:'USA'
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
},
{ collection: 'users' });
const Users = mongoose.model('user', User);
module.exports.Users = UserData = Users;

module.exports.addUser = addUser = function(firstName, lastName, email, addr1, addr2, city, state, zipCode, country, username, password){
  console.log("----------------------------------------------------------------------");
  console.log("Pokemon Trader: \n" + firstName + " " + lastName + "\n" + email + "\n" + addr1 + "\n" + addr2 + "\n" + city + ", " + state + " " + zipCode + " " + country + "\n" + username+ "\n" + password);
  console.log("----------------------------------------------------------------------");
  return new Promise((resolve, reject) => {
    var newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      address1: addr1,
      address2: addr2,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country,
      username: username,
      password: password
    });
    newUser.save().then(docs =>{
      resolve(docs);
    }).catch(err =>{
      return reject(err);
    })
  });
}

module.exports.addUserObj = addUserObj = function(user){
  console.log("----------------------------------------------------------------------");
  console.log("Pokemon Trainer OBJECT: " + user.firstName + " " + user.lastName + "\n" + user.email + "\n" + user.address1 + "\n" + user.address2 + "\n" + user.city + ", " + user.state + " " + user.zipCode + " " + user.country + "\n" + user.username + "\n" + user.password);
  console.log("----------------------------------------------------------------------");
  return new Promise((resolve, reject) => {
    var newUser = new Users({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      country: user.country,
      username: user.username,
      password: user.password
    });
    newUser.save().then(docs =>{
      resolve(docs);
    }).catch(err => {
      console.log(err);
      return reject(err);
    })
  });
}

module.exports.getAllUsers = getAllUsers = function(){
  console.log("----------------------------------------------------------------------");
  console.log("Retrieving users from the database.");
  console.log("----------------------------------------------------------------------");
  return new Promise((resolve, reject) => {
    Users.find({}).then(docs => {
    resolve(docs);
  }).catch(err => {
    console.log(err);
    return reject(err);
    })
  });
}

module.exports.getUser = getUser = function(userID){
  console.log("----------------------------------------------------------------------");
  console.log("Retrieving the user by their ID: " + email);
  return new Promise((resolve, reject) => {
    Users.findOne({_id: userID}).then(docs =>{
      console.log("User found!");
      console.log("----------------------------------------------------------------------");
      resolve(docs);
    }).catch(err =>{
      console.log("Something went wrong!");
      console.log("----------------------------------------------------------------------");
      console.log(err);
      return reject(err);
    })
  });
}

module.exports.deleteUser = deleteUser = function(userID){
  return new Promise((resolve, reject) => {
    Users.deleteOne({_id: userID}).then(docs =>{
      console.log("This should delete it.");
      resolve(docs);
    }).catch(err =>{
      console.error(err);
      return reject(err);
    })
  });
}
