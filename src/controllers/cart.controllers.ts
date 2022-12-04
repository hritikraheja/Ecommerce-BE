// @ts-ignore
import { Types } from "mongoose";
import { MONGO_DB_REF } from "../constants/database_names";
import { ERROR } from "../constants/error";
import { SUCCESS } from "../constants/succes";
import { Cart } from "../models/cart.model";
import { Orders } from "../models/orders.model";
import { Products } from "../models/products.model";
import { Promocode } from "../models/promocode.model";
import { Vendors } from "../models/vendors.model";
import { verifyJwtToken } from "../utils/helpers";

export const CartController = {
  getCartItems: async (req, res) => {
    try {
      var id = req.body.id;
      var cart = await Cart.find({ userId: id });
      res.status(SUCCESS.GET_200.code).send(cart[0]);
    } catch (err) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  getEstimatedPrice: async (req, res) => {
    let token = req.header("JWT_CERT");
    let tokenData = await verifyJwtToken(token);
    let userId = tokenData.userId;
    let cart = await Cart.findOne({userId : userId})
    if(!cart){
      return res.status(406).send('Cart not found!')
    }
    let appliedPromocodeId = cart.promocodeId;
    let promocodeDetails = await Promocode.findOne({_id : appliedPromocodeId})
    let aggregate = await Cart.aggregate([
      { $unwind: "$products" },
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $project: {
          userId: 1,
          productId: "$products.productId",
          quantity: "$products.quantity",
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "details",
        },
      },
      { $unwind: "$details" },
      {
        $project: {
          userId: 1,
          estimatedPrice: {
            $sum: { $multiply: ["$details.originalMRP", "$quantity"] },
          },
        },
      },
      {
        $group: { _id: "$userId", estimatedPrice: { $sum: "$estimatedPrice" } },
      },
    ]).exec();
    res.json(
      {
        result : aggregate[0].estimatedPrice - (aggregate[0].estimatedPrice*parseInt(promocodeDetails.discountPercentage + "")/100)
      }
    )
  },
  addItemToCart: async (req, res) => {
    let token = req.header("JWT_CERT");
    let tokenData = await verifyJwtToken(token);
    let userId = tokenData.userId;
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    let inDb = await Cart.find({ userId: userId });
    if (inDb.length > 0) {
      let productWithProductId = inDb[0].products.filter(
        (p) => p.productId == productId
      );
      if (productWithProductId.length == 0) {
        try {
          await Cart.findOneAndUpdate(
            { userId: userId },
            {
              $push: { products: { productId: productId, quantity: quantity } },
            }
          );
          res.status(202).send("Added to Cart!");
        } catch (err) {
          res.status(500).send("Database Error! : " + err);
        }
      } else {
        try {
          await Cart.findOneAndUpdate(
            { userId: userId, "products.productId": productId },
            { $inc: { "products.$.quantity": quantity } }
          );
          res.status(202).send("Added to Cart!");
        } catch (err) {
          res.status(500).send("Database Error! : " + err);
        }
      }
    } else {
      let cart = new Cart({
        userId: userId,
        products: [
          {
            productId: productId,
            quantity: quantity,
          },
        ],
      });
      try {
        cart.save();
        res.status(201).send("Added to cart!");
      } catch (err) {
        res.status(500).send("Database error! : " + err);
      }
    }
  },
  removeItemFromCart: async (req, res) => {
    let token = req.header("JWT_CERT");
    let tokenData = await verifyJwtToken(token);
    let userId = tokenData.userId;
    let productId = req.body.productId;
    let cart = await Cart.find({ userId: userId });
    if (cart.length == 0) {
      res.status(202).send("Not found in cart");
      return;
    }
    var productsArray = cart[0].products;
    let products = productsArray.filter(
      (product) => product.productId != productId
    );
    try {
      await Cart.findOneAndUpdate({ userId: userId }, { products: products, promocodeId : undefined });
      res.send("Removed from Cart!");
    } catch (err) {
      res.status(500).send("Database Error! : " + err);
    }
  },
  clearCart: async (req, res) => {
    let token = req.header("JWT_CERT");
    let tokenData = await verifyJwtToken(token);
    let userId = tokenData.userId;
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(SUCCESS.PUT_204).send({ result: "Cart not found!" });
    }
    try {
      await Cart.findOneAndUpdate({ userId: userId }, { products: [], promocodeId : undefined });
      res.send("Cart cleared!");
    } catch (e) {
      res.status(500).send("Database Error! : " + e);
    }
  },
  applyPromocode: async (req, res) => {
    let token = req.header("JWT_CERT");
    let tokenData = await verifyJwtToken(token);
    let userId = tokenData.userId;
    let codeName = req.body.promocodeName;
    let aggregate = await Cart.aggregate([
      { $unwind: "$products" },
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $project: {
          userId: 1,
          productId: "$products.productId",
          quantity: "$products.quantity",
          _id: 0,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "details",
        },
      },
      { $unwind: "$details" },
      {
        $project: {
          userId: 1,
          estimatedPrice: {
            $sum: { $multiply: ["$details.originalMRP", "$quantity"] },
          },
        },
      },
      {
        $group: { _id: "$userId", estimatedPrice: { $sum: "$estimatedPrice" } },
      },
    ]);
    let orderPrice = aggregate[0].estimatedPrice;
    let promocodeDetails = await Promocode.findOne({name : codeName})
    if(!promocodeDetails){
      return res.status(406).send('Promocode not found!')
    }
    if(orderPrice >= promocodeDetails.minimumOrderValue){
      await Cart.findOneAndUpdate({userId : userId}, {promocodeId : promocodeDetails._id})
      res.status(SUCCESS.POST_201.code).send(SUCCESS.POST_201)
    } else {
      res.status(406).send('Promocode not applicable!')
    }
  },
  buyCartItems: async (req, res) => {
    let token = req.header("JWT_CERT");
    let tokenData = await verifyJwtToken(token);
    let userId = tokenData.userId;
    let productsInCartArray = await Cart.find({ userId: userId });
    let productsInCart = productsInCartArray[0].products;
    let promocodeDetails = await Promocode.findOne({_id : productsInCartArray[0].promocodeId})
    let totalPrice = 0;
    let productsAvailable = true;
    try {
      for (let i = 0; i < productsInCart.length; i++) {
        let product = await Products.findOne({
          _id: productsInCart[i].productId,
        });
        if (!product) {
          productsAvailable = false;
          break;
        }
        let productQuantityAvailable =
          product.quantityReceived - product.quantitySold;
        totalPrice += product.originalMRP;
        if (productQuantityAvailable < productsInCart[i].quantity) {
          productsAvailable = false;
        }
      }
      if (!productsAvailable) {
        return res.status(409).send("Products not available!");
      }
      for (let i = 0; i < productsInCart.length; i++) {
        let qty = productsInCart[i].quantity;
        await CartHelper.updateVendorSuppliesAfterSelling(
          productsInCart[i].productId,
          qty
        );
        if(promocodeDetails){
          totalPrice = totalPrice - totalPrice * parseInt(promocodeDetails.discountPercentage + '')/100
        }
        await Cart.findOneAndUpdate({ userId: userId }, { products: [] });
        let order = new Orders({
          userId: userId,
          orderPrice: totalPrice,
          products: productsInCart,
          promocodeId : productsInCartArray[0].promocodeId,
        });
        await order.save();
        res.status(SUCCESS.POST_201.code).send("Order Placed Successfully!");
      }
    } catch (e) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
};

export const CartHelper = {
  updateVendorSuppliesAfterSelling: async (productId, qty) => {
    try {
      let product = await Products.findOne({ _id: productId });
      let vendorId = product.vendorId;
      await Vendors.findOneAndUpdate(
        { _id: vendorId, "supply.productId": productId },
        { $inc: { "supply.$.quantity": -1 * qty } }
      );
      await Products.findOneAndUpdate(
        { _id: productId },
        {
          $inc: { quantitySold: qty },
          $set: {
            inStock: product.quantityReceived - product.quantitySold > qty,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
};
