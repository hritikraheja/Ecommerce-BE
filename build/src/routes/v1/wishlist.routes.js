"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const wishlist_controllers_1 = require("../../controllers/wishlist.controllers");
const router = express.Router();
router.get("/", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, wishlist_controllers_1.WishlistController.getWishlistByToken);
router.get("/:id", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, wishlist_controllers_1.WishlistController.getWishlist);
router.put("/addItemToWishlist", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {
        productId: celebrate_1.Joi.string().required(),
    }
}), wishlist_controllers_1.WishlistController.addItemToWishlist);
router.put('/removeItemFromWishlist', Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {
        productId: celebrate_1.Joi.string().required()
    }
}), wishlist_controllers_1.WishlistController.removeItemFromWishlist);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=wishlist.routes.js.map