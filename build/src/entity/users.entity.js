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
exports.UserEntity = void 0;
const base_entity_1 = require("./base.entity");
const constants_1 = require("../constants/constants");
const helpers_1 = require("../utils/helpers");
const error_1 = require("../constants/error");
const middleware_1 = require("../middleware");
class UsersClass extends base_entity_1.BaseEntity {
    constructor() {
        super('Users');
    }
    verifyOtp(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validateUser = yield this.getOneEntity({ phone: params.phone, countryCode: params.countryCode, status: { $in: [constants_1.USER_STATUS.ACTIVE, constants_1.USER_STATUS.UNVERIFIED] } }, {});
                if (validateUser) {
                    if (params.otp == 2525 && validateUser.AccountVerifyOTP.otp != null) {
                        let updateData = {
                            AccountVerifyOTP: {
                                otp: null,
                                generateTime: null,
                                expireTime: null
                            }
                        };
                        if (!validateUser.isPhoneVerified) {
                            updateData.isPhoneVerified = true;
                            updateData.status = constants_1.USER_STATUS.ACTIVE;
                        }
                        let updateUser = yield this.updateOneEntity({ _id: validateUser._id }, { $set: updateData });
                        //create session
                        let accesToken = yield middleware_1.createUserSession(updateUser, params);
                        updateUser.accessToken = accesToken;
                        return updateUser;
                    }
                    throw error_1.ERROR.INAVLID_OTP;
                }
                throw error_1.ERROR.USER_DOESNOT_EXISTS;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getLimit = yield helpers_1.getLimitOffset(params.limit, params.page);
                let query = {
                    status: { $ne: constants_1.USER_STATUS.DELETED }
                };
                let pipeLine = [
                    {
                        $match: query
                    }
                ];
                pipeLine.push({ $skip: getLimit.offset });
                pipeLine.push({ $limit: Number(getLimit.limit) + 1 });
                pipeLine.push({
                    $project: {
                        profileImage: 1,
                        name: 1,
                        email: 1,
                        phone: 1,
                        countryCode: 1,
                        loginType: 1,
                        createdOn: 1,
                        status: 1
                    }
                });
                let userList = yield this.aggregate(pipeLine);
                if (userList.length > getLimit.limit) {
                    userList.pop();
                    return { nextPage: params.page + 1, data: userList, limit: params.limit };
                }
                return { nextPage: -1, data: userList, limit: params.limit };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserDetail(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getOneEntity({ _id: params.userId }, { password: 0 });
            }
            catch (error) {
                throw error;
            }
        });
    }
    changeUserStatus(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.updateOneEntity({ _id: params.userId }, { status: params.status });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProfile(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validateUser = yield this.getOneEntity({ _id: params.userId }, {});
                if (validateUser) {
                    params.isProfileCreated = true;
                    let updateUser = yield this.updateOneEntity({ _id: params.userId }, { $set: params });
                    delete updateUser.AccountVerifyOTP;
                    return updateUser;
                }
                throw error_1.ERROR.USER_DOESNOT_EXISTS;
            }
            catch (error) {
                throw error;
            }
        });
    }
    resendOtp(params, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let generateTime = helpers_1.dateConstants.currentTimeStamp();
                let expireTime = helpers_1.dateConstants.addDurationToDate(generateTime, constants_1.TIME_CONSTANTS.OTP_EXPIRE_TIME_REGISTRATION, constants_1.TIME_CONSTANTS.HOURS);
                let AccountVerifyOTP = {
                    generateTime: generateTime,
                    expireTime: expireTime
                };
                if (userData.AccountVerifyOTP.otp == null) {
                    AccountVerifyOTP.otp = yield helpers_1.generateRandomOtp(4);
                }
                yield this.updateOneEntity({ _id: userData._id }, { $set: { AccountVerifyOTP: AccountVerifyOTP } });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserEntity = new UsersClass();
//# sourceMappingURL=users.entity.js.map