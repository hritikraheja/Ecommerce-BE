"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.UserSchema = void 0;
//@ts-nocheck
const mongoose_1 = require("mongoose");
const helpers_1 = require("./../utils/helpers");
const database_names_1 = require("../constants/database_names");
const constants_1 = require("../constants/constants");
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
    updatedOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() },
    role: { type: Number, default: constants_1.ROLES.USER }
});
exports.UserSchema.index({ name: 1, email: 1 });
exports.Users = mongoose_1.model(database_names_1.MONGO_DB_REF.USERS, exports.UserSchema);
//# sourceMappingURL=users.model.js.map