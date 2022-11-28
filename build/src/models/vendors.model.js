"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendors = exports.VendorSchema = void 0;
//@ts-nocheck
const mongoose_1 = require("mongoose");
const helpers_1 = require("./../utils/helpers");
const database_names_1 = require("../constants/database_names");
exports.VendorSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: { type: String },
    supply: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                ref: database_names_1.MONGO_DB_REF.PRODUCTS,
            },
            quantity: { type: Number },
        },
    ],
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
    updatedOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
});
exports.VendorSchema.index({ name: 1, email: 1 });
exports.Vendors = mongoose_1.model(database_names_1.MONGO_DB_REF.VENDORS, exports.VendorSchema);
//# sourceMappingURL=vendors.model.js.map