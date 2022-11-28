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
exports.AdminController = void 0;
const entity_1 = require("../entity");
const error_1 = require("../constants/error");
exports.AdminController = {
    getUserList: (params) => __awaiter(void 0, void 0, void 0, function* () {
        return yield entity_1.UserEntity.getUserList(params);
    }),
    userDetail: (params) => __awaiter(void 0, void 0, void 0, function* () {
        return yield entity_1.UserEntity.getUserDetail(params);
    }),
    statusUpdate: (params) => __awaiter(void 0, void 0, void 0, function* () {
        let validateUser = yield entity_1.UserEntity.getOneEntity({ _id: params.userId }, { status: 1 });
        if (validateUser) {
            if (validateUser.status == params.status)
                throw error_1.ERROR.INAVLID_STATUS;
            return yield entity_1.UserEntity.changeUserStatus(params);
        }
        throw error_1.ERROR.USER_DOESNOT_EXISTS;
    }),
};
//# sourceMappingURL=admin.controller.js.map