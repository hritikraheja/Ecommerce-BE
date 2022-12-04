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
exports.UsersController = void 0;
const error_1 = require("../constants/error");
const succes_1 = require("../constants/succes");
const users_model_1 = require("../models/users.model");
const constants_1 = require("../constants/constants");
const config = require("config");
const bcrypt = require("bcrypt");
const helpers_1 = require("../utils/helpers");
exports.UsersController = {
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let plainPassword = req.body.password;
        let email = req.body.email;
        let users = yield users_model_1.Users.find({ email: email });
        if (users.length == 0) {
            res
                .status(error_1.ERROR.USER_DOESNOT_EXISTS.code)
                .send(error_1.ERROR.USER_DOESNOT_EXISTS.message);
            return;
        }
        let user = users[0];
        let passwordMatched = yield bcrypt.compare(plainPassword, user.password);
        if (!passwordMatched) {
            res
                .status(error_1.ERROR.INCORRECT_PASSWORD.code)
                .send(error_1.ERROR.INCORRECT_PASSWORD.message);
            return;
        }
        let signedToken = yield helpers_1.createJwtToken({
            userId: user._id,
            email: email,
            password: user.password,
            role: user.role,
        }, config.get("JWT_CERT"));
        res.status(succes_1.SUCCESS.LOGIN_SUCCESSFULL.code).json({ token: signedToken });
    }),
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let plainPassword = req.body.password;
        const encryptedPassword = yield bcrypt.hash(plainPassword, 10);
        const user = new users_model_1.Users({
            email: req.body.email,
            password: encryptedPassword,
            userName: req.body.userName,
            role: req.body.role ? req.body.role : constants_1.ROLES.USER,
        });
        try {
            let newUser = yield user.save();
            res.status(succes_1.SUCCESS.POST_201.code).json(newUser);
        }
        catch (e) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(`Database Error!${e}`);
        }
    }),
    validateToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header('JWT_CERT');
        let tokenData = yield helpers_1.verifyJwtToken(token);
        res.status(succes_1.SUCCESS.GET_200.code).json({ status: "Token is valid", tokenDetails: {
                userId: tokenData.userId,
                email: tokenData.email,
                iat: tokenData.iat,
                role: tokenData.role == 0 ? 'User' : (tokenData.role == 1 ? 'Admin' : 'Vendor')
            } });
    }),
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let users = yield users_model_1.Users.find({}, { email: 1, name: 1, _id: 0 });
            res.send({ users: users });
        }
        catch (err) {
            res.status(500).send("Database Error : \n" + err);
        }
    }),
    getUserByEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let email = req.params.email;
        try {
            let user = yield users_model_1.Users.find({ email: email }, { email: 1, name: 1, role: 1, _id: 0 });
            res.send({
                user: user
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Database Error!");
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var query = req.body.query;
            var fieldsToBeUpdated = req.body.updates;
            if (fieldsToBeUpdated.password) {
                let encryptedPassword = yield bcrypt.hash(fieldsToBeUpdated.password, 10);
                fieldsToBeUpdated.password = encryptedPassword;
            }
        }
        catch (e) {
            res.status(406).send("Invalid query or update fields");
        }
        try {
            let updatedUser = yield users_model_1.Users.findOneAndUpdate(query, fieldsToBeUpdated);
            if (updatedUser) {
                res.status(succes_1.SUCCESS.PUT_200_DATA.code).send(succes_1.SUCCESS.PATCH_200_DATA);
            }
            else {
                res.status(succes_1.SUCCESS.PUT_204.code).send("User not found!");
            }
        }
        catch (e) {
            res
                .status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code)
                .send(error_1.ERROR.INTERNAL_SERVER_ERROR_500.message);
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let email = req.body.email;
            let deletedUser = yield users_model_1.Users.deleteOne({ email: email });
            if (deletedUser) {
                res.status(succes_1.SUCCESS.DELETE_204.code).send(succes_1.SUCCESS.DELETE_204);
            }
            else {
                res.status(succes_1.SUCCESS.NOT_FOUND.code).send("User not found!");
            }
        }
        catch (e) {
            console.log(e);
            res.status(error_1.ERROR.INTERNAL_SERVER_ERROR_500.code).send(error_1.ERROR.INTERNAL_SERVER_ERROR_500);
        }
    }),
};
//# sourceMappingURL=users.controller.js.map