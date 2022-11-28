"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const users_controller_1 = require("../../controllers/users.controller");
const router = express.Router();
router.post("/login", Middlewares.Auth.Authenticate, celebrate_1.celebrate({
    body: {
        email: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
    },
}), users_controller_1.UsersController.loginUser);
router.post("/create", Middlewares.Auth.Authenticate, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
        role: celebrate_1.Joi.number().optional(),
    },
}), users_controller_1.UsersController.createUser);
router.get("/validateToken", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, users_controller_1.UsersController.validateToken);
router.get("/", Middlewares.Auth.Authenticate, users_controller_1.UsersController.getUsers);
router.get("/:email", Middlewares.Auth.Authenticate, users_controller_1.UsersController.getUserByEmail);
router.put("/update", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        query: celebrate_1.Joi.object().required(),
        updates: celebrate_1.Joi.object().required()
    }
}), users_controller_1.UsersController.updateUser);
router.delete("/delete", Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, users_controller_1.UsersController.deleteUser);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=users.routes.js.map