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
const helpers_1 = require("./../../utils/helpers");
// import { SUCCESS_MESSAGE } from "../../common/constants/successMesaages";
const helpers_2 = require("../../utils/helpers");
const helpers_3 = require("../../utils/helpers");
const Middlewares = require("../../middleware");
const controllers_1 = require("../../controllers");
const succes_1 = require("../../constants/succes");
const constants_1 = require("../../constants/constants");
const router = express.Router();
router.post("/login", Middlewares.Auth.Authenticate, celebrate_1.celebrate({
    body: {
        phone: celebrate_1.Joi.number().required(),
        countryCode: celebrate_1.Joi.number().required(),
        deviceToken: celebrate_1.Joi.string().optional(),
        deviceId: celebrate_1.Joi.string().optional(),
        platform: celebrate_1.Joi.number().valid(constants_1.PLATFORM.ANDROID, constants_1.PLATFORM.IOS).required()
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.UserController.userLogin(req.body);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.POST_201_DATA);
        responseData.message = succes_1.SUCCESS_MESSAGE.SUCCESS;
        responseData.response = data;
        helpers_2.sendSuccess(res, responseData);
    }
    catch (error) {
        helpers_3.sendError(res, error);
    }
}));
router.post("/verifyOtp", Middlewares.Auth.Authenticate, celebrate_1.celebrate({
    body: {
        phone: celebrate_1.Joi.number().required(),
        countryCode: celebrate_1.Joi.number().required(),
        otp: celebrate_1.Joi.number().required(),
        deviceToken: celebrate_1.Joi.string().optional()
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.UserController.verifyOtp(req.body);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.POST_201_DATA);
        responseData.message = succes_1.SUCCESS_MESSAGE.SUCCESS;
        responseData.response = data;
        helpers_2.sendSuccess(res, responseData);
    }
    catch (error) {
        helpers_3.sendError(res, error);
    }
}));
router.post("/profile", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    body: {
        userId: celebrate_1.Joi.string().required(),
        profileImage: celebrate_1.Joi.string().optional(),
        name: celebrate_1.Joi.string().optional(),
        email: celebrate_1.Joi.string().optional(),
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.UserController.createProfile(req.body);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.POST_201_DATA);
        responseData.message = succes_1.SUCCESS_MESSAGE.SUCCESS;
        responseData.response = data;
        helpers_2.sendSuccess(res, responseData);
    }
    catch (error) {
        helpers_3.sendError(res, error);
    }
}));
router.get("/profile", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, celebrate_1.celebrate({
    query: {
        userId: celebrate_1.Joi.string().required()
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.UserController.getProfile(req.query);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.POST_201_DATA);
        responseData.message = succes_1.SUCCESS_MESSAGE.SUCCESS;
        responseData.response = data;
        helpers_2.sendSuccess(res, responseData);
    }
    catch (error) {
        helpers_3.sendError(res, error);
    }
}));
router.get("/resendOtp", Middlewares.Auth.Authenticate, celebrate_1.celebrate({
    query: {
        phone: celebrate_1.Joi.number().required(),
        countryCode: celebrate_1.Joi.number().required(),
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.UserController.resendOtp(req.query);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.POST_201_DATA);
        responseData.message = succes_1.SUCCESS_MESSAGE.SUCCESS;
        responseData.response = data;
        helpers_2.sendSuccess(res, responseData);
    }
    catch (error) {
        helpers_3.sendError(res, error);
    }
}));
router.post("/logout", Middlewares.Auth.Authenticate, Middlewares.Auth.UserAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.UserController.userLogout(JSON.parse(req['userData']), req['tokenData']);
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
//# sourceMappingURL=users.route.js.map