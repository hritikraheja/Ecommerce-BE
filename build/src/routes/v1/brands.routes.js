"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const brands_controllers_1 = require("../../controllers/brands.controllers");
const router = express.Router();
router.get("/", Middlewares.Auth.Authenticate, brands_controllers_1.BrandsController.getAllBrands);
router.get("/:name", Middlewares.Auth.Authenticate, brands_controllers_1.BrandsController.getBrandByName);
router.post("/create", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().optional(),
        moto: celebrate_1.Joi.string().optional(),
        email: celebrate_1.Joi.string().required(),
        rating: celebrate_1.Joi.number().required(),
    },
}), brands_controllers_1.BrandsController.createBrand);
router.put("/update", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        query: celebrate_1.Joi.object().required(),
        updates: celebrate_1.Joi.object().required(),
    },
}), brands_controllers_1.BrandsController.updateBrand);
router.delete("/delete", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
    },
}), brands_controllers_1.BrandsController.deleteBrand);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=brands.routes.js.map