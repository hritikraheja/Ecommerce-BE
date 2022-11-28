"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = exports.UserSessionSchema = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("./../utils/helpers");
const database_names_1 = require("../constants/database_names");
exports.UserSessionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: database_names_1.MONGO_DB_REF.USERS },
    loginTime: { type: Number },
    logoutTime: { type: Number },
    isLogin: { type: Boolean, default: true },
    deviceInfo: { type: Object },
    platform: { type: Number },
    createdOn: { type: Number, default: helpers_1.dateConstants.currentTimeStamp() }
});
exports.UserSessionSchema.index({ "createdOn": 1, email: 1, name: 1 });
exports.UserSession = mongoose_1.model(database_names_1.MONGO_DB_REF.USER_SESSION, exports.UserSessionSchema);
//# sourceMappingURL=userSession.model.js.map