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
exports.BrandsController = void 0;
const error_1 = require("../constants/error");
const succes_1 = require("../constants/succes");
const brands_model_1 = require("../models/brands.model");
exports.BrandsController = {
    getAllBrands: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let brands = yield brands_model_1.Brands.find({}, { name: 1, moto: 1, description: 1, rating: 1, email: 1, _id: 0 });
            res.status(succes_1.SUCCESS.GET_200.code).json({ result: brands });
        }
        catch (err) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    getBrandByName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let name = req.params.name;
        try {
            let brand = yield brands_model_1.Brands.findOne({ name: name }, { name: 1, moto: 1, description: 1, rating: 1, email: 1, _id: 0 });
            res.send({
                result: brand,
            });
        }
        catch (err) {
            console.log(err);
            res.status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code).send("Database Error!");
        }
    }),
    createBrand: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var brand = new brands_model_1.Brands(req.body);
        try {
            let newBrand = yield brand.save();
            res
                .status(succes_1.SUCCESS.POST_201.code)
                .send(Object.assign(Object.assign({}, succes_1.SUCCESS.POST_201), newBrand));
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(`Database Error!${e}`);
        }
    }),
    updateBrand: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedBrand = yield brands_model_1.Brands.findOneAndUpdate(req.body.query, req.body.updates);
            if (updatedBrand) {
                res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PUT_200_DATA);
            }
            else {
                res.status(succes_1.SUCCESS.PUT_204.code).send("Brand not found!");
            }
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500.message);
        }
    }),
    deleteBrand: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let deletedUser = yield brands_model_1.Brands.deleteOne({ name: req.body.name });
            if (deletedUser) {
                res.status(succes_1.SUCCESS.DELETE_204.code).send(succes_1.SUCCESS.DELETE_204);
            }
            else {
                res.status(succes_1.SUCCESS.NOT_FOUND.code).send("Brand not found!");
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
//# sourceMappingURL=brands.controllers.js.map