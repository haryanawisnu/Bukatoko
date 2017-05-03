var Item = require('../models/items');

module.exports = {
  getall: (req, res, next) => {
    Item.find().exec(function(err, result) {
      if (result) {
        res.json(result);
      } else {
        res.send(`ERR getall :\n ${err}`);
      }
    });
  },
  create: (req, res, next) => {
    Item.create({
      item_id: req.body.item_id,
      item_name: req.body.item_name,
      price_item: req.body.price_item,
      item_description: req.body.item_description,
      img_url: req.body.img_url
    }, function(error, result) {
      if (result) {
        res.json(result);
      } else {
        res.send(`ERR input :\n ${error}`);
      }
    });
  },
  delete: (req, res, next) => {
    let id = req.params.id;
    Item.remove({
      _id: id
    }, function(err) {
      if (!err) {
        res.send(`Success remove with id ${id}`);
      } else {
        res.send(`ERR input :\n ${error}`);
      }
    });
  },
  update: (req, res, next) => {
    let id = req.params.id;
    Item.findOne({
      _id: id
    }).exec(function(err, result) {
      if (result) {
        Item.update({
          _id: id
        }, {
          $set: {
            item_id: req.body.item_id || result.item_id,
            item_name: req.body.item_name || result.item_name,
            price_item: req.body.price_item || result.price_item,
            item_description: req.body.item_description || result.item_description,
            img_url: req.body.img_url || result.img_url
          }
        }, function(err, result) {
          if (result) {
            res.json(result);
          } else {
            res.send(`ERR Update :\n ${err}`);
          }
        });
      } else {
        res.send(`ERR getall :\n ${err}`);
      }
    });
  }
}
