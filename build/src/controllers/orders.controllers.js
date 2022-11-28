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
exports.OrdersController = void 0;
const error_1 = require("../constants/error");
const succes_1 = require("../constants/succes");
const orders_model_1 = require("../models/orders.model");
const helpers_1 = require("../utils/helpers");
exports.OrdersController = {
    getAllOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let orders = yield orders_model_1.Orders.find({});
            res.status(succes_1.SUCCESS.GET_200.code).json({ result: orders });
        }
        catch (err) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    getMyOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header('JWT_CERT');
        let tokenData = yield helpers_1.verifyJwtToken(token);
        let userId = tokenData.userId;
        try {
            let orders = yield orders_model_1.Orders.find({ userId: userId });
            res.status(succes_1.SUCCESS.GET_200.code).json({ result: orders });
        }
        catch (err) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    updateOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedOrder = yield orders_model_1.Orders.findOneAndUpdate(req.body.query, req.body.updates);
            if (updatedOrder) {
                res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PUT_200_DATA);
            }
            else {
                res.status(succes_1.SUCCESS.PUT_204.code).send("Order not found!");
            }
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500.message);
        }
    }),
    deleteOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let deletedOrder = yield orders_model_1.Orders.deleteOne({ _id: req.body.orderId });
            if (deletedOrder) {
                res.status(succes_1.SUCCESS.DELETE_204.code).send(succes_1.SUCCESS.DELETE_204);
            }
            else {
                res.status(succes_1.SUCCESS.NOT_FOUND.code).send("Order not found!");
            }
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
};
//# sourceMappingURL=orders.controllers.js.map