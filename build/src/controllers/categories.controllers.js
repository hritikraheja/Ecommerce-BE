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
exports.CateroriesController = void 0;
const error_1 = require("../constants/error");
const succes_1 = require("../constants/succes");
const categories_model_1 = require("../models/categories.model");
exports.CateroriesController = {
    getAllCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let categories = yield categories_model_1.Categories.find({});
            let result = categories.map((category) => ({
                name: category.name,
                type: category.type,
                description: category.description
            }));
            res.status(succes_1.SUCCESS.GET_200.code).json({ result: result });
        }
        catch (err) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var category = new categories_model_1.Categories(req.body);
        try {
            let newCategory = yield category.save();
            res
                .status(succes_1.SUCCESS.POST_201.code)
                .send(Object.assign(Object.assign({}, succes_1.SUCCESS.POST_201), newCategory));
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(`Database Error!${e}`);
        }
    }),
    updateCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedCategory = yield categories_model_1.Categories.findOneAndUpdate(req.body.query, req.body.updates);
            if (updatedCategory) {
                res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PUT_200_DATA);
            }
            else {
                res.status(succes_1.SUCCESS.PUT_204.code).send("Category not found!");
            }
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500.message);
        }
    }),
    deleteCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let deletedCategory = yield categories_model_1.Categories.deleteOne({ name: req.body.name });
            if (deletedCategory) {
                res.status(succes_1.SUCCESS.DELETE_204.code).send(succes_1.SUCCESS.DELETE_204);
            }
            else {
                res.status(succes_1.SUCCESS.NOT_FOUND.code).send("BCategory not found!");
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
//# sourceMappingURL=categories.controllers.js.map