import { ERROR } from '../constants/error';
import { SUCCESS } from '../constants/succes';
import {Wishlist} from '../models/wishlist.models';
import { verifyJwtToken } from '../utils/helpers';

export const WishlistController =  {
  getWishlist: async (req, res) => {
    try {
      var id = req.params.id;
      var wishlist = await Wishlist.find({ userId: id });
      res.status(SUCCESS.GET_200.code).send(wishlist[0]);
    } catch (err) {
      console.log(err)
      res.status(ERROR.INTERNAL_SERVER_ERROR_500.code).send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  getWishlistByToken : async (req, res) => {
    let token = req.header('JWT_CERT')
    let tokenData = await verifyJwtToken(token)
    var id = tokenData.userId
    try {
      var wishlist = await Wishlist.find({ userId: id });
      res.status(SUCCESS.GET_200.code).send(wishlist[0]);
    } catch (err) {
      console.log(err)
      res.status(ERROR.INTERNAL_SERVER_ERROR_500.code).send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  addItemToWishlist: async (req, res) => {
    let token = req.header('JWT_CERT')
    let tokenData = await verifyJwtToken(token)
    let userId = tokenData.userId
    let productId = req.body.productId
    let inDb = await Wishlist.find({ userId : userId });
    if (inDb.length > 0) {
      let productWithProductId = inDb[0].products.filter((p) => p.productId == productId);
      if (productWithProductId.length == 0) {
        try {
          await Wishlist.findOneAndUpdate(
            { userId : userId },
            { $push: { products: { productId : productId } } }
          );
          res.status(202).send("Added to Wishlist!");
        } catch (err) {
          res.status(500).send("Database Error! : " + err);
        }
      } else {
        res.status(202).send("Added to Wishlist!");
      }
    } else {
      let cart = new Wishlist({
        userId : userId,
        products: [
          {
            productId : productId,
          },
        ],
      });
      try {
        cart.save();
        res.status(201).send("Added to Wishlist!");
      } catch (err) {
        res.status(500).send("Database error! : " + err);
      }
    }
  },
  removeItemFromWishlist: async (req, res) => {
    let token = req.header('JWT_CERT')
    let tokenData = await verifyJwtToken(token)
    let userId = tokenData.userId
    let productId = req.body.productId
    let wishlist = await Wishlist.find({ userId : userId });
    if (wishlist.length == 0) {
      res.status(202).send("Not found in Wishlist");
      return;
    }
    var productsArray = wishlist[0].products;
    let products = productsArray.filter((product) => product.productId != productId);
    try {
      await Wishlist.findOneAndUpdate({ userId : userId }, { products : products });
      res.send("Removed from Cart!");
    } catch (err) {
      res.status(500).send("Database Error! : " + err);
    }
  },
};
