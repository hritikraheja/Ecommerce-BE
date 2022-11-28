"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = exports.ProductSchema = void 0;
//@ts-nocheck
const mongoose_1 = require("mongoose");
const helpers_1 = require("./../utils/helpers");
const database_names_1 = require("../constants/database_names");
exports.ProductSchema = new mongoose_1.Schema({
    name: { type: String },
    categoryId: {
        type: mongoose_1.Types.ObjectId,
        ref: database_names_1.MONGO_DB_REF.CATEGORIES
    },
    brandId: {
        type: mongoose_1.Types.ObjectId,
        ref: database_names_1.MONGO_DB_REF.BRAND
    },
    size: { type: Number },
    inStock: { type: Boolean, default: false },
    quantityReceived: { type: Number, default: 0 },
    quantitySold: { type: Number, default: 0 },
    originalMRP: { type: Number },
    vendorId: { type: mongoose_1.Types.ObjectId, ref: database_names_1.MONGO_DB_REF.VENDORS },
    description: { type: String },
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
});
exports.ProductSchema.index({ name: 1 });
exports.Products = mongoose_1.model(database_names_1.MONGO_DB_REF.PRODUCTS, exports.ProductSchema);
//# sourceMappingURL=products.model.js.map