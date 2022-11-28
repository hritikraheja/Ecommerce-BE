"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const orders_controllers_1 = require("../../controllers/orders.controllers");
const router = express.Router();
router.get("/getAllOrders", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {}
}), orders_controllers_1.OrdersController.getAllOrders);
router.get('/myOrders', Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {}
}), orders_controllers_1.OrdersController.getMyOrders);
router.put('/update', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        query: celebrate_1.Joi.object().required(),
        updates: celebrate_1.Joi.object().required()
    }
}), orders_controllers_1.OrdersController.updateOrder);
router.delete('/delete', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        orderId: celebrate_1.Joi.string().required()
    }
}), orders_controllers_1.OrdersController.deleteOrder);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=orders.routes.js.map