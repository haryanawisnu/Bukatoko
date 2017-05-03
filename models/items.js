var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemsSchema = new Schema({
  item_id: String,
  item_name: String,
  price_item: Number,
  item_description: String,
  img_url: String
});
var Item = mongoose.model('Item', itemsSchema);

module.exports = Item;
