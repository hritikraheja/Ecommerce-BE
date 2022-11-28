"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_DELIVERY_STATUS = exports.PAYMENT_STATUS = exports.ROLES = exports.PRODUCT_STATUS = exports.CATEGORY_STATUS = exports.TOKEN_TYPE = exports.LOGIN_TYPE = exports.TIME_CONSTANTS = exports.PLATFORM = exports.CONSTANT_VALUES = exports.USER_STATUS = void 0;
exports.USER_STATUS = Object.freeze({
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
    UNVERIFIED: 4,
});
exports.CONSTANT_VALUES = {
    MAX_LIMIT: 100,
    MIN_LIMIT: 10,
    PAGE: 1
};
exports.PLATFORM = {
    IOS: 1,
    ANDROID: 2
};
exports.TIME_CONSTANTS = Object.freeze({
    OTP_EXPIRE_TIME_REGISTRATION: 2,
    HOURS: 'h',
    MONTH: 'month'
});
exports.LOGIN_TYPE = Object.freeze({
    PHONE: 1,
    FACEBOOK: 2,
    GOOGLE: 3,
    APPLE: 4
});
exports.TOKEN_TYPE = {
    USER_ACCESS_TOKEN: 1
};
exports.CATEGORY_STATUS = Object.freeze({
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
    OUT_OF_STOCK: 4
});
exports.PRODUCT_STATUS = Object.freeze({
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
    OUT_OF_STOCK: 4
});
exports.ROLES = Object.freeze({
    USER: 0,
    ADMIN: 1,
    VENDOR: 2
});
exports.PAYMENT_STATUS = Object.freeze({
    PENDING: 0,
    COMPLETE: 1,
    FAILED: 2
});
exports.ORDER_DELIVERY_STATUS = Object.freeze({
    WAITING_FOR_APPROVAL: 0,
    READY_FOR_DISPATCH: 1,
    PARTIALLY_DISPATCHED: 2,
    DISPATCHED: 3,
    DELIVERED: 4,
    UNDELIVERED: 5
});
//# sourceMappingURL=constants.js.map