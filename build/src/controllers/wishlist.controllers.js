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
exports.WishlistController = void 0;
const error_1 = require("../constants/error");
const succes_1 = require("../constants/succes");
const wishlist_models_1 = require("../models/wishlist.models");
const helpers_1 = require("../utils/helpers");
exports.WishlistController = {
    getWishlist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var id = req.params.id;
            var wishlist = yield wishlist_models_1.Wishlist.find({ userId: id });
            res.status(succes_1.SUCCESS.GET_200.code).send(wishlist[0]);
        }
        catch (err) {
            console.log(err);
            res.status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code).send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    getWishlistByToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header('JWT_CERT');
        let tokenData = yield helpers_1.verifyJwtToken(token);
        var id = tokenData.userId;
        try {
            var wishlist = yield wishlist_models_1.Wishlist.find({ userId: id });
            res.status(succes_1.SUCCESS.GET_200.code).send(wishlist[0]);
        }
        catch (err) {
            console.log(err);
            res.status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code).send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    addItemToWishlist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header('JWT_CERT');
        let tokenData = yield helpers_1.verifyJwtToken(token);
        let userId = tokenData.userId;
        let productId = req.body.productId;
        let inDb = yield wishlist_models_1.Wishlist.find({ userId: userId });
        if (inDb.length > 0) {
            let productWithProductId = inDb[0].products.filter((p) => p.productId == productId);
            if (productWithProductId.length == 0) {
                try {
                    yield wishlist_models_1.Wishlist.findOneAndUpdate({ userId: userId }, { $push: { products: { productId: productId } } });
                    res.status(202).send("Added to Wishlist!");
                }
                catch (err) {
                    res.status(500).send("Database Error! : " + err);
                }
            }
            else {
                res.status(202).send("Added to Wishlist!");
            }
        }
        else {
            let cart = new wishlist_models_1.Wishlist({
                userId: userId,
                products: [
                    {
                        productId: productId,
                    },
                ],
            });
            try {
                cart.save();
                res.status(201).send("Added to Wishlist!");
            }
            catch (err) {
                res.status(500).send("Database error! : " + err);
            }
        }
    }),
    removeItemFromWishlist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header('JWT_CERT');
        let tokenData = yield helpers_1.verifyJwtToken(token);
        let userId = tokenData.userId;
        let productId = req.body.productId;
        let wishlist = yield wishlist_models_1.Wishlist.find({ userId: userId });
        if (wishlist.length == 0) {
            res.status(202).send("Not found in Wishlist");
            return;
        }
        var productsArray = wishlist[0].products;
        let products = productsArray.filter((product) => product.productId != productId);
        try {
            yield wishlist_models_1.Wishlist.findOneAndUpdate({ userId: userId }, { products: products });
            res.send("Removed from Cart!");
        }
        catch (err) {
            res.status(500).send("Database Error! : " + err);
        }
    }),
};
//# sourceMappingURL=wishlist.controllers.js.map