"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = exports.CategorySchema = void 0;
//@ts-nocheck
const mongoose_1 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const database_names_1 = require("../constants/database_names");
exports.CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
});
exports.Categories = mongoose_1.model(database_names_1.MONGO_DB_REF.CATEGORIES, exports.CategorySchema);
//# sourceMappingURL=categories.model.js.map