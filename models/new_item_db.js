var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Item = new Schema({
  itemID:{
    type: Number,
    requireD: true
  },
  itemName:{
    type:String,
    required: true
  },
  itemType:{
    type: String,
    required: true
  },
  itemBio:{
    type: String,
    required: true
  },
  itemRating:{
    type: Number,
    default: 0
  },
  itemIMG:{
    type: String,
    required: true
  },
  status:{
    type: String,
    default: "available",
    validate: {
      validator: function(value) {
        return (value.toLocaleLowerCase() == "available" || value.toLocaleLowerCase() == "pending" || value.toLocaleLowerCase() == "swapped");
      },
      message: 'Status should only be available, pending, or swapped.'
    }
  },
  swapItem:{
    type: String,
    default: "none"
  },
  swapRating:{
    type: Number,
    default: 0
  },
  genRating:{
    type: Number,
    default: 0
  },
  swapperRating:{
    type: Number,
    default: 0
  },
  userID:{
    type: String,
    default: ""
  }
},
  {collection: 'items'}
);

//----------------------------------------------------
const Items = mongoose.model('item', Item);
module.exports.Items = ItemData = Items
//----------------------------------------------------

module.exports.addItem = addItem = function(itemID, itemName, itemType, itemBio, itemRating, itemIMG){ //This method seems to do both without calling a 2nd method
  console.log("Pokemon Card: " + itemID + " " + itemName + " " +itemType + " " + itemBio + " " + itemRating + " " +  itemIMG);
  return new Promise((resolve, reject) => {
    var newItem = new Items({
      itemID: itemID,
      itemName: itemName,
      itemType: itemType,
      itemBio: itemBio,
      itemRating: itemRating,
      itemIMG: itemIMG
    });
    newItem.save().then(docs =>{
      resolve(docs);
    }).catch(err => {
      return reject(err);
    })
  });
}



module.exports.addItemObj = addItemObj = function(item){
  console.log("----------------------------------------------------------------------");
  console.log("Pokemon Card OBJECT: " + item.itemID + " " + item.itemName + " " + item.itemType + " " + item.itemBio + " " + item.itemRating + " " + item.itemIMG );
  console.log("----------------------------------------------------------------------");
  return new Promise((resolve, reject) => {
    var newItem = new Items({
      itemID: item.itemID,
      itemName: item.itemName,
      itemType: item.itemType,
      itemBio: item.itemBio,
      itemRating: item.itemRating,
      itemIMG: item.itemIMG
    });
    newItem.save().then(docs =>{
      resolve(docs);
    }).catch(err =>{
      return reject(err);
    })
  });
}

module.exports.getAllItems = getAllItems = function(){
   return new Promise((resolve, reject) => {
    Items.find({}).then(docs =>{
      resolve(docs);

    }).catch(err => {
      console.log(err);
      return reject(err);
    })
  });
}

module.exports.getItem = getItem = function(itemCode){
    return new Promise((resolve, reject) => {
      Items.findOne({itemID: itemCode}).then(docs =>{
        console.log("This is inside of the getItem() function: " + docs);
        console.log('----------------------------------------------------');
        resolve(docs);

      }).catch(err => {
        console.log(err);
        return reject(err);
      })
    });
}

module.exports.updateStatus = function(itemId, status){
  return new Promise((resolve, reject) => {
    Items.findOneAndUpdate({_id:itemId},{status: status}).then(docs => {
      resolve(docs);
    }).catch(err =>{
      console.error(err);
      return reject(err);
    })
  });
}

module.exports.deleteItem = deleteItem = function(itemID){
    return new Promise((resolve, reject) => {
      Items.deleteOne({_id: itemID}).then(docs =>{
        console.log("This should delete it.");
        resolve(docs);
      }).catch(err =>{
        console.error(err);
        return reject(err);
      })
    });
}
module.exports.addOwnership = addOwnership = function(itemID, userID){
    return new Promise((resolve, reject) => {
      Items.findOneAndUpdate({_id: itemID}, {userID: userID}).then(docs =>{
        console.log("User " + userID + " now has ownership of item " + docs._id);
        resolve(docs);
      }).catch(err =>{
        console.error(err);
        return reject(err);
      })
    });
}

module.exports.getUserItems = function(userID){
  return new Promise((resolve, reject) => {
    Items.find({ userID: userID}).then(docs =>{
      console.log("This should be multiple items.");
      resolve(docs);
    }).catch(err =>{
      console.error(err);
      return reject(err);
    })
  });
}
