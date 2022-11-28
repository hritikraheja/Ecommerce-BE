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
exports.UserController = void 0;
const entity_1 = require("../entity");
const constants_1 = require("../constants/constants");
const helpers_1 = require("../utils/helpers");
const error_1 = require("../constants/error");
exports.UserController = {
    userSignupByEmail: (data) => __awaiter(void 0, void 0, void 0, function* () { }),
    userLogin: (data) => __awaiter(void 0, void 0, void 0, function* () {
        let findAccount = yield entity_1.UserEntity.getOneEntity({ countryCode: data.countryCode, phone: data.phone, status: { $in: [constants_1.USER_STATUS.ACTIVE, constants_1.USER_STATUS.UNVERIFIED] } }, {});
        let generateTime = helpers_1.dateConstants.currentTimeStamp();
        let expireTime = helpers_1.dateConstants.addDurationToDate(generateTime, constants_1.TIME_CONSTANTS.OTP_EXPIRE_TIME_REGISTRATION, constants_1.TIME_CONSTANTS.HOURS);
        let AccountVerifyOTP = {
            otp: yield helpers_1.generateRandomOtp(4),
            generateTime: generateTime,
            expireTime: expireTime
        };
        let userData;
        if (findAccount) {
            userData = yield entity_1.UserEntity.updateOneEntity({ _id: findAccount._id }, { $set: { AccountVerifyOTP: AccountVerifyOTP } });
        }
        else {
            userData = yield entity_1.UserEntity.createOneEntity({
                phone: data.phone,
                countryCode: data.countryCode,
                AccountVerifyOTP: AccountVerifyOTP,
                loginType: constants_1.LOGIN_TYPE.PHONE
            });
        }
        return true;
    }),
    verifyOtp: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield entity_1.UserEntity.verifyOtp(data);
    }),
    createProfile: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield entity_1.UserEntity.updateProfile(data);
    }),
    getProfile: (data) => __awaiter(void 0, void 0, void 0, function* () {
        let userInfo = yield entity_1.UserEntity.getOneEntity({ _id: data.userId }, { name: 1, profileImage: 1, email: 1, phone: 1, countryCode: 1, isProfileCreated: 1, isPhoneVerified: 1, status: 1 });
        if (userInfo.status == constants_1.USER_STATUS.INACTIVE)
            throw error_1.ERROR.ACCOUNT_BLOCKED;
        if (userInfo.status != constants_1.USER_STATUS.ACTIVE)
            throw error_1.ERROR.USER_DOESNOT_EXISTS;
        return userInfo;
    }),
    resendOtp: (data) => __awaiter(void 0, void 0, void 0, function* () {
        let validateUser = yield entity_1.UserEntity.getOneEntity({ countryCode: data.countryCode, phone: data.phone }, {});
        if (validateUser) {
            if (validateUser.status == constants_1.USER_STATUS.INACTIVE)
                throw error_1.ERROR.ACCOUNT_BLOCKED;
            if (validateUser.status == constants_1.USER_STATUS.DELETED)
                throw error_1.ERROR.USER_DOESNOT_EXISTS;
            return yield entity_1.UserEntity.resendOtp(data, validateUser);
        }
        throw error_1.ERROR.USER_DOESNOT_EXISTS;
    }),
    userLogout: (data, tokenData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield entity_1.UserSessionEntity.userLogout(data, tokenData);
    }),
};
//# sourceMappingURL=user.controller.js.map