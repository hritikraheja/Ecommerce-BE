"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = exports.OrderSchema = void 0;
//@ts-nocheck
const mongoose_1 = require("mongoose");
const helpers_1 = require("./../utils/helpers");
const database_names_1 = require("../constants/database_names");
const constants_1 = require("../constants/constants");
exports.OrderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true, ref: database_names_1.MONGO_DB_REF.USERS },
    orderPrice: { type: Number, required: true },
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
    paymentStatus: { type: Number, default: constants_1.PAYMENT_STATUS.PENDING },
    orderDeliveryStatus: { type: Number, default: constants_1.ORDER_DELIVERY_STATUS.WAITING_FOR_APPROVAL },
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
});
exports.Orders = mongoose_1.model(database_names_1.MONGO_DB_REF.ORDER, exports.OrderSchema);
//# sourceMappingURL=orders.model.js.map