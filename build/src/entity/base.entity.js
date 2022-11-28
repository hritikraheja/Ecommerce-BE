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
exports.BaseEn = exports.BaseEntity = void 0;
const Services = require("./../utils/mongo_dao");
const mongoose_1 = require("mongoose");
class BaseEntity {
    constructor(modelName) {
        this.ObjectId = mongoose_1.Types.ObjectId;
        this.DAOManager = new Services.mongoDAOManager();
        this.modelName = modelName;
    }
    createOneEntity(saveData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.saveData(this.modelName, saveData);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    createMulti(saveData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.insertMany(this.modelName, saveData, {});
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getOneEntity(criteria, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            try {
                let data = yield this.DAOManager.findOne(this.modelName, criteria, projection, { lean: true });
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
            // let data = await model.findOne({
            //     where : criteria
            // })
            // return data
            // } catch (error) {
            //     return Promise.reject(error)
            // }
        });
    }
    updateOneEntity(criteria, dataToUpdate, option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (option == undefined)
                    option = { new: true, lean: true };
                let data = yield this.DAOManager.findAndUpdate(this.modelName, criteria, dataToUpdate, option);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    replaceOneEntity(criteria, replacement, option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (option == undefined)
                    option = { new: true, upsert: true };
                let data = yield this.DAOManager.findAndReplaceOne(this.modelName, criteria, replacement, option);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getById(_id, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.findOne(this.modelName, { _id: _id }, projection, { lean: true });
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getMultiple(criteria, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.getData(this.modelName, criteria, projection, { lean: true });
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getDistinct(key, criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.distinct(this.modelName, key, criteria);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateMultiple(criteria, projection, option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (option == undefined)
                    option = { new: true, multi: true };
                let data = yield this.DAOManager.updateMany(this.modelName, criteria, projection, option);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    aggregate(pipeline, option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (option == undefined)
                    option = { lean: true };
                let data = yield this.DAOManager.aggregateData(this.modelName, pipeline, option);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    removeEntity(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.remove(this.modelName, criteria);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    findAndRemove(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.findAndRemove(this.modelName, criteria, {});
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    count(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.count(this.modelName, criteria);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getMultiplePaginate(criteria, projection, option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.DAOManager.getDataPagination(this.modelName, criteria, projection, option);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    updateEntity(criteria, dataToUpdate, option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (option == undefined)
                    option = { lean: true };
                let data = yield this.DAOManager.updateOrUpsert(this.modelName, criteria, dataToUpdate, option);
                return data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.BaseEntity = BaseEntity;
exports.BaseEn = new BaseEntity();
//# sourceMappingURL=base.entity.js.map