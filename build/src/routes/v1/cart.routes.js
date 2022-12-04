"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const cart_controllers_1 = require("../../controllers/cart.controllers");
const router = express.Router();
router.get("/", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        id: celebrate_1.Joi.string().required()
    }
}), cart_controllers_1.CartController.getCartItems);
router.put("/addItemsToCart", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {
        productId: celebrate_1.Joi.string().required(),
        quantity: celebrate_1.Joi.number().required()
    }
}), cart_controllers_1.CartController.addItemToCart);
router.put('/removeItemsFromCart', Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {
        productId: celebrate_1.Joi.string().required()
    }
}), cart_controllers_1.CartController.removeItemFromCart);
router.get('/estimatedOrderPrice', Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, cart_controllers_1.CartController.getEstimatedPrice);
router.post('/applyPromocode', Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {
        promocodeName: celebrate_1.Joi.string().required()
    }
}), cart_controllers_1.CartController.applyPromocode);
router.put('/clearCart', Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {}
}), cart_controllers_1.CartController.clearCart);
router.post('/buy', Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {}
}), cart_controllers_1.CartController.buyCartItems);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=cart.routes.js.map