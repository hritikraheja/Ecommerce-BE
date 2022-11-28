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
exports.VendorController = void 0;
const succes_1 = require("../constants/succes");
const error_1 = require("../constants/error");
const vendors_model_1 = require("../models/vendors.model");
const products_model_1 = require("../models/products.model");
exports.VendorController = {
    getAllVendors: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let vendors = yield vendors_model_1.Vendors.find({});
            res.status(succes_1.SUCCESS.GET_200.code).json({ result: vendors });
        }
        catch (err) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    getVendorByName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let name = req.params.name;
        try {
            let vendorsArray = yield vendors_model_1.Vendors.find({ name: name });
            if (vendorsArray.length == 0) {
                return res.status(succes_1.SUCCESS.NOT_FOUND.code).send(succes_1.SUCCESS.NOT_FOUND);
            }
            let vendor = vendorsArray[0];
            res.send(vendor);
        }
        catch (err) {
            console.log(err);
            res.status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code).send("Database Error!");
        }
    }),
    createVendor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var vendor = new vendors_model_1.Vendors(req.body);
        try {
            let newVendor = yield vendor.save();
            res
                .status(succes_1.SUCCESS.POST_201.code)
                .send(Object.assign(Object.assign({}, succes_1.SUCCESS.POST_201), newVendor));
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(`Database Error!${e}`);
        }
    }),
    updateVendor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let updatedVendor = yield vendors_model_1.Vendors.findOneAndUpdate(req.body.query, req.body.updates);
            if (updatedVendor) {
                res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PUT_200_DATA);
            }
            else {
                res.status(succes_1.SUCCESS.PUT_204.code).send("Vendor not found!");
            }
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500.message);
        }
    }),
    deleteVendor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let deletedVendor = yield vendors_model_1.Vendors.deleteOne({ name: req.body.name });
            if (deletedVendor) {
                res.status(succes_1.SUCCESS.DELETE_204.code).send(succes_1.SUCCESS.DELETE_204);
            }
            else {
                res.status(succes_1.SUCCESS.NOT_FOUND.code).send("Vendor not found!");
            }
        }
        catch (e) {
            console.log(e);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
    addSupplies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let productId = req.body.productId;
        let quantity = req.body.quantity;
        let product = yield products_model_1.Products.findOne({ _id: productId });
        if (!product) {
            return res
                .status(succes_1.SUCCESS.NOT_FOUND.code)
                .json({ result: "Product not found!" });
        }
        let vendorId = product.vendorId;
        let vendor = yield vendors_model_1.Vendors.findOne({ _id: vendorId });
        if (!vendor) {
            return res
                .status(succes_1.SUCCESS.NOT_FOUND.code)
                .json({ result: "Vendor not found!" });
        }
        let supply = vendor.supply;
        try {
            let givenProductSupply = supply.filter((supply) => supply.productId == productId);
            if (givenProductSupply.length == 0) {
                yield vendors_model_1.Vendors.findOneAndUpdate({ _id: vendorId }, { $push: { supply: { productId: productId, quantity: quantity } } });
            }
            else {
                yield vendors_model_1.Vendors.findOneAndUpdate({ _id: vendorId, "supply.productId": productId }, { $inc: { "supply.$.quantity": quantity } });
            }
        }
        catch (e) {
            console.log(`Error in updating Vendors db : ${e}`);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
        try {
            yield products_model_1.Products.findOneAndUpdate({ _id: productId }, {
                $set: { inStock: true },
                $inc: { quantityReceived: quantity },
            });
        }
        catch (e) {
            console.log(`Error in updating Products db : ${e}`);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
        res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PUT_200_DATA);
    }),
    removeSupplies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let productId = req.body.productId;
        let quantity = req.body.quantity;
        let product = yield products_model_1.Products.findOne({ _id: productId });
        if (!product) {
            return res.status(succes_1.SUCCESS.NOT_FOUND.code).json({ result: "Product not found!" });
        }
        let vendorId = product.vendorId;
        let vendor = yield vendors_model_1.Vendors.findOne({ _id: vendorId });
        if (!vendor) {
            return res.status(succes_1.SUCCESS.NOT_FOUND.code).json({ result: "Vendor not found!" });
        }
        let supply = vendor.supply;
        try {
            let givenProductSupply = supply.filter((supply) => supply.productId == productId);
            if (givenProductSupply.length == 0 || quantity > givenProductSupply[0].quantity) {
                return res
                    .status(error_1.ERROR.INAVLID_STATUS.code)
                    .send("Quantity greater then total supply.");
            }
            else {
                yield vendors_model_1.Vendors.findOneAndUpdate({ _id: vendorId, "supply.productId": productId }, { $inc: { "supply.$.quantity": -1 * quantity } });
            }
        }
        catch (e) {
            console.log(`Error in updating Vendors db : ${e}`);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
        try {
            let productAvailability = product.quantityReceived - product.quantitySold;
            let inStock = productAvailability > quantity;
            yield products_model_1.Products.findOneAndUpdate({ _id: productId }, {
                $inc: {
                    quantityReceived: -1 * quantity,
                },
                $set: { inStock: inStock },
            });
        }
        catch (e) {
            console.log(`Error in updating Products db : ${e}`);
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
        res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PUT_200_DATA);
    }),
};
//# sourceMappingURL=vendors.controllers.js.map