"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.CartSchema = void 0;
//@ts-nocheck
const mongoose_1 = require("mongoose");
const helpers_1 = require("./../utils/helpers");
const database_names_1 = require("../constants/database_names");
exports.CartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true, ref: database_names_1.MONGO_DB_REF.USERS },
    products: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                ref: database_names_1.MONGO_DB_REF.PRODUCTS,
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    promocodeId: {
        type: mongoose_1.Types.ObjectId,
        ref: database_names_1.MONGO_DB_REF.PROMOCODE
    },
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
    updatedOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
});
exports.Cart = mongoose_1.model(database_names_1.MONGO_DB_REF.CART, exports.CartSchema);
//# sourceMappingURL=cart.model.js.map