module.exports.userItemsArray = userItemsArray = [];
module.exports.userItems = userItems = function(item, rating, status, swapItem, swapRating, swapperRating){

  if(status == "Available"){
    this.item          = item;
    this.rating        = rating;
    this.status        = status;
    this.swapItem      = undefined;
    this.swapRating    = undefined;
    this.swapperRating = undefined;
    userItemsArray.push(this);
  }
  else if(this.status == "Pending"){
    this.item = item;
    this.rating = rating;
    this.status        = status;
    this.swapItem      = swapItem;
    this.swapRating    = undefined;
    this.swapperRating = undefined;
    userItemsArray.push(this);
  }
  else if(status == "Swapped"){
    this.item          = item;
    this.rating        = rating;
    this.status        = status;
    this.swapItem      = swapItem;
    this.swapRating    = swapRating;
    this.swapperRating = swapperRating;
    userItemsArray.push(this);
  }
}
