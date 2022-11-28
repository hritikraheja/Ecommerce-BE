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
exports.verifyJwtToken = exports.createJwtToken = exports.generateRandomOtp = exports.getLogger = exports.sendError = exports.sendSuccess = exports.copyObject = exports.getLimitOffset = exports.dateConstants = void 0;
const moment = require("moment");
const constants_1 = require("../constants/constants");
const error_1 = require("../constants/error");
const winston_1 = require("winston");
const randomstring = require("randomstring");
const jsonwebtoken_1 = require("jsonwebtoken");
const config = require("config");
let logger;
exports.dateConstants = {
    currentTimeStamp: () => moment().utc().unix() * 1000,
    currentUtcDate: () => moment.utc().format(),
    startOfDate: (date, timestamp) => {
        if (timestamp)
            return moment(date).utc().startOf('d').unix() * 1000;
        return moment(date).utc().startOf('d').toDate();
    },
    endOfDate: (date, timestamp) => {
        if (timestamp)
            return moment(date).utc().endOf('d').unix() * 1000;
        return moment(date).utc().endOf('d').toDate();
    },
    startOfDay: () => moment().utcOffset(0).startOf('d').format('YYYY-MM-DD HH:mm:ss.SSS'),
    endOfDay: () => moment().utcOffset(0).endOf('d').format('YYYY-MM-DD HH:mm:ss.SSS'),
    monthStart: (month, year) => { return moment().year(year).month(month - 1).startOf('month').toISOString(); },
    monthEnd: (month, year) => { return moment().year(year).month(month - 1).endOf('month').toISOString(); },
    yearStart: (year) => { return moment().year(year).startOf('year').toISOString(); },
    yearEnd: (year) => { return moment().year(year).endOf('year').toISOString(); },
    addDurationToDate: (date, duration, type) => { return moment(date).add(duration, type).utc().unix() * 1000; },
    formatedTime: (date, timestamp) => {
        if (timestamp)
            return moment(date).format('LLLL');
        return moment(date).format('LLLL');
    }
};
const getLimitOffset = (limit, page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (limit) {
            limit = Math.abs(limit);
            // If limit exceeds max limit
            if (limit > constants_1.CONSTANT_VALUES.MAX_LIMIT) {
                limit = constants_1.CONSTANT_VALUES.MAX_LIMIT;
            }
        }
        else {
            limit = constants_1.CONSTANT_VALUES.MIN_LIMIT;
        }
        if (page && page != 0) {
            page = Math.abs(page);
        }
        else {
            page = constants_1.CONSTANT_VALUES.PAGE;
        }
        let offset = (page - 1) * limit;
        offset = offset < 0 ? 0 : offset;
        return { limit: limit, offset: offset };
    }
    catch (err) {
        console.error(err);
        throw new Error(err);
    }
});
exports.getLimitOffset = getLimitOffset;
const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
exports.copyObject = copyObject;
let sendSuccess = function (res, responseData) {
    res.status(responseData.code).send(responseData);
};
exports.sendSuccess = sendSuccess;
let sendError = function (res, errors) {
    console.log(errors);
    if (Array.isArray(errors)) {
        let errorData = exports.copyObject(error_1.ERROR.VALIDATION_ERROR_400);
        errorData.errors = errors;
        res.status(errorData.code).send(errorData);
    }
    else if (errors && errors.hasOwnProperty('code')) {
        let errorData = {};
        errorData.message = errors.message;
        errorData.code = errors.code;
        if (Array.isArray(errors.errors))
            errorData.errors = errors.errors;
        res.status(errors.code).send(errorData);
    }
    else {
        let errorData = exports.copyObject(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        if (errors.message) {
            exports.getLogger(process.cwd() + '../../logs').error(errors.message);
        }
        if (errors.SequelizeDatabaseError) {
            exports.getLogger(process.cwd() + '../../logs').error(errors.SequelizeDatabaseError);
        }
        // if(CONFIG.APP.ENV === "Dev" && errors.message) {
        // 	errorData.message = errors.message;
        // }
        res.status(errorData.code).send(errorData);
    }
};
exports.sendError = sendError;
const getLogger = (logDir) => {
    if (!logger) {
        logger = winston_1.createLogger({
            format: winston_1.format.combine(winston_1.format.timestamp({
                format: 'YYYY-MM-DD hh:mm:ss |'
            }), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
            transports: [
                new winston_1.transports.File({
                    filename: `${logDir}/error.log`
                })
            ]
        });
    }
    return logger;
};
exports.getLogger = getLogger;
let generateRandomOtp = function (digits) {
    return randomstring.generate({
        length: digits,
        charset: 'numeric'
    });
};
exports.generateRandomOtp = generateRandomOtp;
const createJwtToken = (payload, cert, expiryTime) => __awaiter(void 0, void 0, void 0, function* () {
    if (expiryTime)
        return yield jsonwebtoken_1.sign(payload, cert, { expiresIn: expiryTime });
    return yield jsonwebtoken_1.sign(payload, cert);
});
exports.createJwtToken = createJwtToken;
const verifyJwtToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jsonwebtoken_1.verify(payload, config.get('JWT_CERT'));
    }
    catch (error) {
        return null;
    }
});
exports.verifyJwtToken = verifyJwtToken;
//# sourceMappingURL=helpers.js.map