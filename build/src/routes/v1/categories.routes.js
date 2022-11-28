"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const categories_controllers_1 = require("../../controllers/categories.controllers");
const router = express.Router();
router.get("/", Middlewares.Auth.Authenticate, categories_controllers_1.CateroriesController.getAllCategories);
router.post("/create", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
        type: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().optional()
    },
}), categories_controllers_1.CateroriesController.createCategory);
router.put("/update", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        query: celebrate_1.Joi.object().required(),
        updates: celebrate_1.Joi.object().required(),
    },
}), categories_controllers_1.CateroriesController.updateCategory);
router.delete("/delete", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
    },
}), categories_controllers_1.CateroriesController.deleteCategory);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=categories.routes.js.map