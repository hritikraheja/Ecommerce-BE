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
const express = require("express");
const celebrate_1 = require("celebrate");
const helpers_1 = require("../../utils/helpers");
const helpers_2 = require("../../utils/helpers");
const helpers_3 = require("../../utils/helpers");
const Middlewares = require("../../middleware");
const controllers_1 = require("../../controllers");
const succes_1 = require("../../constants/succes");
const router = express.Router();
router.post("/", Middlewares.Auth.Authenticate, celebrate_1.celebrate({
    body: {
        name: celebrate_1.Joi.string().required(),
        inStock: celebrate_1.Joi.boolean().required(),
        totalQuantity: celebrate_1.Joi.number().required(),
        originalMRP: celebrate_1.Joi.number().required(),
        description: celebrate_1.Joi.string().optional(),
    },
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.ProductsController.addNewProduct(req.body);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.POST_201_DATA);
        responseData.message = succes_1.SUCCESS_MESSAGE.SUCCESS;
        responseData.response = data;
        helpers_2.sendSuccess(res, responseData);
    }
    catch (error) {
        helpers_3.sendError(res, error);
    }
}));
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=products.route.js.map