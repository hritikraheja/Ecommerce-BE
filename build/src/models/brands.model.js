"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brands = exports.BrandSchema = void 0;
//@ts-nocheck
const mongoose_1 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const database_names_1 = require("../constants/database_names");
exports.BrandSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    moto: { type: String },
    description: { type: String },
    rating: { type: Number, required: true },
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
    updatedOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
});
exports.Brands = mongoose_1.model(database_names_1.MONGO_DB_REF.BRAND, exports.BrandSchema);
//# sourceMappingURL=brands.model.js.map