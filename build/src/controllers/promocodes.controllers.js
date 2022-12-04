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
exports.PromocodeController = void 0;
const promocode_model_1 = require("../models/promocode.model");
const succes_1 = require("../constants/succes");
const error_1 = require("../constants/error");
exports.PromocodeController = {
    getAllPromocodes: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let promocodes = yield promocode_model_1.Promocode.find({}, {
                name: 1,
                description: 1,
                discountPercentage: 1,
                minimumOrderValue: 1,
                _id: 0,
            });
            res.status(succes_1.SUCCESS.GET_200.code).json({ result: promocodes });
        }
        catch (err) {
            console.log(err);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    createPromocode: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var promocode = new promocode_model_1.Promocode(req.body);
        try {
            let newPromocode = yield promocode.save();
            res
                .status(succes_1.SUCCESS.POST_201.code)
                .send(Object.assign(Object.assign({}, succes_1.SUCCESS.POST_201), newPromocode));
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(`Database Error!${e}`);
        }
    }),
    getApplicablePromocode: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let orderValue = req.body.orderValue;
            let promocodes = yield promocode_model_1.Promocode.find({ minimumOrderValue: { $lte: orderValue } }, {
                name: 1,
                description: 1,
                discountPercentage: 1,
                minimumOrderValue: 1,
                _id: 0,
            });
            res.status(succes_1.SUCCESS.GET_200.code).json({ result: promocodes });
        }
        catch (err) {
            console.log(err);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    updatePromocode: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedPromocode = yield promocode_model_1.Promocode.findOneAndUpdate(req.body.query, req.body.updates);
            if (updatedPromocode) {
                res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PUT_200_DATA);
            }
            else {
                res.status(succes_1.SUCCESS.PUT_204.code).send("Promocode not found!");
            }
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500.message);
        }
    }),
    deletePromocode: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let deletedPromocode = yield promocode_model_1.Promocode.deleteOne({ name: req.body.name });
            if (deletedPromocode) {
                res.status(succes_1.SUCCESS.DELETE_204.code).send(succes_1.SUCCESS.DELETE_204);
            }
            else {
                res.status(succes_1.SUCCESS.NOT_FOUND.code).send("Promocode not found!");
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
//# sourceMappingURL=promocodes.controllers.js.map