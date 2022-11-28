"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const controllers_1 = require("../../controllers");
const router = express.Router();
router.get("/", Middlewares.Auth.Authenticate, controllers_1.ProductsController.getAllProducts);
router.get("/:productId", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, controllers_1.ProductsController.getProductByProductId);
router.post('/create', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
        categoryId: celebrate_1.Joi.string().required(),
        brandId: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().optional(),
        size: celebrate_1.Joi.number().required(),
        originalMRP: celebrate_1.Joi.number().required(),
        vendorId: celebrate_1.Joi.string().required()
    }
}), controllers_1.ProductsController.createProduct);
router.put('/update', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        query: celebrate_1.Joi.object().required(),
        updates: celebrate_1.Joi.object().required()
    }
}), controllers_1.ProductsController.updateProduct);
router.delete('/delete', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required()
    }
}), controllers_1.ProductsController.deleteProduct);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=products.routes.js.map