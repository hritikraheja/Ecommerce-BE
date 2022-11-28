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
const controllers_1 = require("../../controllers");
const celebrate_1 = require("celebrate");
const helpers_1 = require("../../utils/helpers");
const succes_1 = require("../../constants/succes");
const Middleware = require("./../../middleware");
var router = require('express').Router();
router.get('/usersDetail', Middleware.Auth.Authenticate, celebrate_1.celebrate({
    query: {
        userId: celebrate_1.Joi.string().required()
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.AdminController.userDetail(req.query);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.GET_200_DATA);
        responseData.response = data;
        helpers_1.sendSuccess(res, responseData);
    }
    catch (e) {
        helpers_1.sendError(res, e);
    }
}));
router.get('/users', Middleware.Auth.Authenticate, celebrate_1.celebrate({
    query: {
        page: celebrate_1.Joi.number().required(),
        limit: celebrate_1.Joi.number().required()
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.AdminController.getUserList(req.query);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.GET_200_DATA);
        responseData.response = data;
        helpers_1.sendSuccess(res, responseData);
    }
    catch (e) {
        helpers_1.sendError(res, e);
    }
}));
router.put('/users/changeStatus', Middleware.Auth.Authenticate, celebrate_1.celebrate({
    body: {
        userId: celebrate_1.Joi.string().required(),
        status: celebrate_1.Joi.number().required()
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield controllers_1.AdminController.statusUpdate(req.body);
        let responseData = helpers_1.copyObject(succes_1.SUCCESS.PUT_200_DATA);
        responseData.response = data;
        helpers_1.sendSuccess(res, responseData);
    }
    catch (e) {
        helpers_1.sendError(res, e);
    }
}));
router.use(celebrate_1.errors());
module.exports = router;
//# sourceMappingURL=admin.route.js.map