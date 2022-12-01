"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promocode = exports.PromocodeSchema = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const database_names_1 = require("../constants/database_names");
exports.PromocodeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    minimumOrderValue: {
        type: Number,
        required: true,
    },
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
});
exports.Promocode = mongoose_1.model(database_names_1.MONGO_DB_REF.PROMOCODE, exports.PromocodeSchema);
//# sourceMappingURL=promocode.model.js.map