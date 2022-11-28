"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartHelper = exports.CartController = void 0;
const error_1 = require("../constants/error");
const succes_1 = require("../constants/succes");
const cart_model_1 = require("../models/cart.model");
const orders_model_1 = require("../models/orders.model");
const products_model_1 = require("../models/products.model");
const vendors_model_1 = require("../models/vendors.model");
const helpers_1 = require("../utils/helpers");
exports.CartController = {
    getCartItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var id = req.params.id;
            var cart = yield cart_model_1.Cart.find({ userId: id });
            res.status(succes_1.SUCCESS.GET_200.code).send(cart[0]);
        }
        catch (err) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    addItemToCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header("JWT_CERT");
        let tokenData = yield helpers_1.verifyJwtToken(token);
        let userId = tokenData.userId;
        let productId = req.body.productId;
        let quantity = req.body.quantity;
        let inDb = yield cart_model_1.Cart.find({ userId: userId });
        if (inDb.length > 0) {
            let productWithProductId = inDb[0].products.filter((p) => p.productId == productId);
            if (productWithProductId.length == 0) {
                try {
                    yield cart_model_1.Cart.findOneAndUpdate({ userId: userId }, {
                        $push: { products: { productId: productId, quantity: quantity } },
                    });
                    res.status(202).send("Added to Cart!");
                }
                catch (err) {
                    res.status(500).send("Database Error! : " + err);
                }
            }
            else {
                try {
                    yield cart_model_1.Cart.findOneAndUpdate({ userId: userId, "products.productId": productId }, { $inc: { "products.$.quantity": quantity } });
                    res.status(202).send("Added to Cart!");
                }
                catch (err) {
                    res.status(500).send("Database Error! : " + err);
                }
            }
        }
        else {
            let cart = new cart_model_1.Cart({
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
            }
            catch (err) {
                res.status(500).send("Database error! : " + err);
            }
        }
    }),
    removeItemFromCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header("JWT_CERT");
        let tokenData = yield helpers_1.verifyJwtToken(token);
        let userId = tokenData.userId;
        let productId = req.body.productId;
        let cart = yield cart_model_1.Cart.find({ userId: userId });
        if (cart.length == 0) {
            res.status(202).send("Not found in cart");
            return;
        }
        var productsArray = cart[0].products;
        let products = productsArray.filter((product) => product.productId != productId);
        try {
            yield cart_model_1.Cart.findOneAndUpdate({ userId: userId }, { products: products });
            res.send("Removed from Cart!");
        }
        catch (err) {
            res.status(500).send("Database Error! : " + err);
        }
    }),
    clearCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header("JWT_CERT");
        let tokenData = yield helpers_1.verifyJwtToken(token);
        let userId = tokenData.userId;
        let cart = yield cart_model_1.Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(succes_1.SUCCESS.PUT_204).send({ result: "Cart not found!" });
        }
        try {
            yield cart_model_1.Cart.findOneAndUpdate({ userId: userId }, { products: [] });
            res.send("Cart cleared!");
        }
        catch (e) {
            res.status(500).send("Database Error! : " + e);
        }
    }),
    buyCartItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header("JWT_CERT");
        let tokenData = yield helpers_1.verifyJwtToken(token);
        let userId = tokenData.userId;
        let productsInCartArray = yield cart_model_1.Cart.find({ userId: userId });
        let productsInCart = productsInCartArray[0].products;
        let totalPrice = 0;
        let productsAvailable = true;
        try {
            for (let i = 0; i < productsInCart.length; i++) {
                let product = yield products_model_1.Products.findOne({
                    _id: productsInCart[i].productId,
                });
                if (!product) {
                    productsAvailable = false;
                    break;
                }
                let productQuantityAvailable = product.quantityReceived -
                    product.quantitySold;
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
                yield exports.CartHelper.updateVendorSuppliesAfterSelling(productsInCart[i].productId, qty);
                yield cart_model_1.Cart.findOneAndUpdate({ userId: userId }, { products: [] });
                let order = new orders_model_1.Orders({
                    userId: userId,
                    orderPrice: totalPrice,
                    products: productsInCart,
                });
                yield order.save();
                res.status(succes_1.SUCCESS.POST_201.code).send("Order Placed Successfully!");
            }
        }
        catch (e) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
};
exports.CartHelper = {
    updateVendorSuppliesAfterSelling: (productId, qty) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let product = yield products_model_1.Products.findOne({ _id: productId });
            let vendorId = product.vendorId;
            yield vendors_model_1.Vendors.findOneAndUpdate({ _id: vendorId, "supply.productId": productId }, { $inc: { "supply.$.quantity": -1 * qty } });
            yield products_model_1.Products.findOneAndUpdate({ _id: productId }, { $inc: { quantitySold: qty }, $set: { inStock: (product.quantityReceived - product.quantitySold) > qty }
            });
        }
        catch (e) {
            console.log(e);
        }
    }),
};
//# sourceMappingURL=cart.controllers.js.map