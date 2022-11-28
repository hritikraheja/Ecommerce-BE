"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const celebrate_1 = require("celebrate");
const Middlewares = require("../../middleware");
const vendors_controllers_1 = require("../../controllers/vendors.controllers");
const router = express.Router();
router.get('/', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, vendors_controllers_1.VendorController.getAllVendors);
router.get('/:name', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, vendors_controllers_1.VendorController.getVendorByName);
router.post('/create', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required(),
        supply: celebrate_1.Joi.array().optional()
    }
}), vendors_controllers_1.VendorController.createVendor);
router.put('/update', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, vendors_controllers_1.VendorController.updateVendor);
router.delete('/delete', Middlewares.Auth.Authenticate, Middlewares.Auth.AdminAuth, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required()
    }
}), vendors_controllers_1.VendorController.deleteVendor);
router.put('/addSupplies', Middlewares.Auth.Authenticate, Middlewares.Auth.VendorAuth, celebrate_1.celebrate({
    body: {
        productId: celebrate_1.Joi.string().required(),
        quantity: celebrate_1.Joi.number().required()
    }
}), vendors_controllers_1.VendorController.addSupplies);
router.put('/removeSupplies', Middlewares.Auth.Authenticate, Middlewares.Auth.VendorAuth, celebrate_1.celebrate({
    body: {
        productId: celebrate_1.Joi.string().required(),
        quantity: celebrate_1.Joi.number().required()
    }
}), vendors_controllers_1.VendorController.removeSupplies);
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=vendors.routes.js.map