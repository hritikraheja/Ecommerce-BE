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
exports.Auth = void 0;
const auth = require("basic-auth");
const constants_1 = require("../constants/constants");
const config = require("config");
const helpers_1 = require("../utils/helpers");
const error_1 = require("../constants/error");
class Auth {
    static Authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // extract the name and password from basic authorization
            let credentails = auth(req);
            // verify the authorization credentials
            if (credentails &&
                credentails.name === config.get("BASIC_AUTH_USER") &&
                credentails.pass === config.get("BASIC_AUTH_PASSWORD")) {
                next();
            }
            else {
                helpers_1.sendError(res, error_1.ERROR.UNAUTHORIZED_401);
            }
        });
    }
    static UserAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.header("JWT_CERT")) {
                    let errorData = helpers_1.copyObject(error_1.ERROR.UNAUTHORIZED_401);
                    return res.status(errorData.code).send(errorData);
                }
                let token = req.header('JWT_CERT');
                let tokenData = yield helpers_1.verifyJwtToken(token).catch((error) => {
                    console.log("Error while verifying user auth token", error);
                    throw error_1.ERROR.UNAUTHORIZED_401;
                });
                if (!tokenData)
                    throw error_1.ERROR.UNAUTHORIZED_401;
                req.tokenData = tokenData;
                next();
            }
            catch (err) {
                console.log(err);
                let errorData = helpers_1.copyObject(error_1.ERROR.UNAUTHORIZED_401);
                return res.status(errorData.code).send(errorData);
            }
        });
    }
    static AdminAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.header("JWT_CERT")) {
                    let errorData = helpers_1.copyObject(error_1.ERROR.UNAUTHORIZED_401);
                    return res.status(errorData.code).send(errorData);
                }
                let token = req.header('JWT_CERT');
                let tokenData = yield helpers_1.verifyJwtToken(token).catch((error) => {
                    console.log("Error while verifying user auth token", error);
                    throw error_1.ERROR.UNAUTHORIZED_401;
                });
                if (!tokenData)
                    throw error_1.ERROR.UNAUTHORIZED_401;
                req.tokenData = tokenData;
                if (tokenData.role != constants_1.ROLES.ADMIN) {
                    let errorData = helpers_1.copyObject(error_1.ERROR.ADMIN_UNAUTHORISED);
                    return res.status(errorData.code).send(errorData);
                }
                next();
            }
            catch (err) {
                console.log(err);
                let errorData = helpers_1.copyObject(error_1.ERROR.UNAUTHORIZED_401);
                return res.status(errorData.code).send(errorData);
            }
        });
    }
    static VendorAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.header("JWT_CERT")) {
                    let errorData = helpers_1.copyObject(error_1.ERROR.UNAUTHORIZED_401);
                    return res.status(errorData.code).send(errorData);
                }
                let token = req.header('JWT_CERT');
                let tokenData = yield helpers_1.verifyJwtToken(token).catch((error) => {
                    console.log("Error while verifying user auth token", error);
                    throw error_1.ERROR.UNAUTHORIZED_401;
                });
                if (!tokenData)
                    throw error_1.ERROR.UNAUTHORIZED_401;
                req.tokenData = tokenData;
                if (tokenData.role == constants_1.ROLES.USER) {
                    let errorData = helpers_1.copyObject(error_1.ERROR.VENDOR_UNAUTHORISED);
                    return res.status(errorData.code).send(errorData);
                }
                next();
            }
            catch (err) {
                console.log(err);
                let errorData = helpers_1.copyObject(error_1.ERROR.UNAUTHORIZED_401);
                return res.status(errorData.code).send(errorData);
            }
        });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map