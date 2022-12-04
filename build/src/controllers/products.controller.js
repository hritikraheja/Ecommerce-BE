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
exports.ProductsController = void 0;
const error_1 = require("../constants/error");
const succes_1 = require("../constants/succes");
const products_model_1 = require("../models/products.model");
exports.ProductsController = {
    getAllProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let products = yield products_model_1.Products.find({}, { name: 1, brandId: 1, categoryId: 1, size: 1, originalMRP: 1, description: 1, inStock: 1, _id: 0 });
            res.status(succes_1.SUCCESS.GET_200.code).json({ result: products });
        }
        catch (err) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    getProductByProductId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let productId = req.params.productId;
        try {
            let product = yield products_model_1.Products.find({ _id: productId }, { name: 1, brandId: 1, categoryId: 1, size: 1, originalMRP: 1, description: 1, inStock: 1, _id: 0 });
            res.send({
                result: {
                    product
                },
            });
        }
        catch (err) {
            console.log(err);
            res.status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code).send("Database Error!");
        }
    }),
    createProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var product = new products_model_1.Products(req.body);
        try {
            let newProduct = yield product.save();
            res
                .status(succes_1.SUCCESS.POST_201.code)
                .send(Object.assign(Object.assign({}, succes_1.SUCCESS.POST_201), newProduct));
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(`Database Error!${e}`);
        }
    }),
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedProduct = yield products_model_1.Products.findOneAndUpdate(req.body.query, req.body.updates);
            if (updatedProduct) {
                res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PUT_200_DATA);
            }
            else {
                res.status(succes_1.SUCCESS.PUT_204.code).send("Product not found!");
            }
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500.message);
        }
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let deletedProduct = yield products_model_1.Products.deleteOne({ name: req.body.name });
            if (deletedProduct) {
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
//# sourceMappingURL=products.controller.js.map