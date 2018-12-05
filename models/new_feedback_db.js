var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Offer_Fb = new Schema({
  offerID:{
    type: ObjectId,
    required: true
  },
  userID1:{
    type: String,
    required: true
  },
  userID2:{
    type: String,
    required: true
  },
  description:{
    type:String,
    requireD: true
  }

}, {collection: 'offer_feedback'});

var Item_Fb = new Schema({
  itemCode:{
    type: Number,
    required: true
  },
  userID:{
    type: String,
    required: true
  },
  rating:{
    type: Number,
    required: true
  }
}, {collection: 'item_feedback'});

const OfferFeedback = mongoose.model('offer_feedback', Offer_Fb);
module.exports.OfferFeedback = OfferFeedback;

const ItemFeedback = mongoose.model('item_feedback', Item_Fb);
module.exports.ItemFeedback = ItemFeedback;

module.exports.addOfferFeedback = addOfferFb = function(offerID, userID1, userID2, description){
  return new Promise((resolve, reject) =>{
    var newFeedback = new OfferFeedback({
      offerID: offerID,
      userID1: userID1,
      userID2: userID2,
      description: description
    });
    newFeedback.save().then(docs => {
      resolve(docs);
    }).catch(err => {
      return reject(err);
    })
  });
}

module.exports.addItemFeedback = addItemFb = function(itemCode, userID, rating){
  return new Promise((resolve, reject) =>{
    var newFeedback = new ItemFeedback({
      itemCode: itemCode,
      userID: userID,
      rating: rating
    });
    newFeedback.save().then(docs => {
      resolve(docs);
    }).catch(err => {
      return reject(err);
    })
  });
}
