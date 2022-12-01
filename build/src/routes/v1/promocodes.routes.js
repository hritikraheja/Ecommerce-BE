"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const promocodes_controllers_1 = require("../../controllers/promocodes.controllers");
const router = express.Router();
router.get("/", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, promocodes_controllers_1.PromocodeController.getAllPromocodes);
router.get("/getApplicablePromocodes", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {
        orderValue: celebrate_1.Joi.number().required()
    }
}), promocodes_controllers_1.PromocodeController.getApplicablePromocode);
router.post("/create", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().optional(),
        discountPercentage: celebrate_1.Joi.number().required(),
        minimumOrderValue: celebrate_1.Joi.number().required()
    }
}), promocodes_controllers_1.PromocodeController.createPromocode);
router.put("/update", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        query: celebrate_1.Joi.object().required(),
        updates: celebrate_1.Joi.object().required(),
    },
}), promocodes_controllers_1.PromocodeController.updatePromocode);
router.delete('/delete', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required()
    }
}), promocodes_controllers_1.PromocodeController.deletePromocode);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=promocodes.routes.js.map