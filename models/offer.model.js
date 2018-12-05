var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Offer = new Schema({
  userID:{
    type:String,
    required: true,
  },
  itemCodeOwn:{
      type: String,
      required: true,
  },
    itemCodeWant:{
        type: String,
        required: true
    },
      itemUserId:{
        type:String,
        required: true
    },
      itemStatus:{
        type: String,
        required: true,
    },
  }, {collection: 'offers'});

const Offers = mongoose.model('offers', Offer);
module.exports.Offers = Offers;


//Test these functions in class

module.exports.addOffer = function (userId, itemCodeOwn, itemCodeWant, itemUserId, itemStatus) {
  console.log("From Offer - "+userId+" "+itemCodeOwn+" "+itemCodeWant+" "+itemUserId+" "+itemStatus);
  return new Promise((resolve, reject) => {
    var newOffer = new Offers({
      userId: userId,
      itemCodeOwn: itemCodeOwn,
      itemCodeWant: itemCodeWant,
      itemUserId: itemUserId,
      itemStatus: itemStatus
    });
    newOffer.save().then(docs =>{
      resolve(docs);
    }).catch(err => {
      return reject(err);
    })
  });
}

module.exports.updateOffer = function (offerId, itemStatus) {
  return new Promise((resolve, reject) => {
    Offers.findOneAndUpdate({_id: offerId},{itemStatus:itemStatus},{new: true}).then(docs =>{
      console.log("From Offer - "+docs);
       resolve(docs);
     }).catch(err => {
       return reject(err);
     })
   })
 }
