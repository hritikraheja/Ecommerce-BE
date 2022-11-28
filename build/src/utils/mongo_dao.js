'use strict';
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
exports.mongoDAOManager = void 0;
const Models = require("../models");
const mongoose_1 = require("mongoose");
class mongoDAOManager {
    constructor() {
        this.ObjectId = new mongoose_1.Types.ObjectId;
    }
    saveData(model, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                data.createdDate = new Date().getTime();
                return yield new ModelName(data).save();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    insertMany(model, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.insertMany(data, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    getData(model, query, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.find(query, projection, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    distinct(model, path, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.distinct(path, query);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    findOne(model, query, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.findOne(query, projection, options).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    findAll(model, query, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.find(query, projection, options).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    findAndUpdate(model, conditions, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                if (options != undefined) {
                    options['writeConcern'] = { w: "majority", wtimeout: 5000 };
                }
                else {
                    options = { writeConcern: { w: "majority", wtimeout: 5000 } };
                }
                return yield ModelName.findOneAndUpdate(conditions, update, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    findAndRemove(model, conditions, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.findOneAndRemove(conditions, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    updateMany(model, conditions, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                if (options != undefined) {
                    options['writeConcern'] = { w: "majority", wtimeout: 5000 };
                }
                else {
                    options = { writeConcern: { w: "majority", wtimeout: 5000 } };
                }
                return yield ModelName.updateMany(conditions, update, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    findAndReplaceOne(model, conditions, replacement, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.replaceOne(conditions, replacement, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    remove(model, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.remove(condition);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    populateData(model, query, projection, options, collectionOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.find(query, projection, options).populate(collectionOptions).exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    count(model, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.count(condition);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    aggregateData(model, aggregateArray, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // utils.consolelog('aggregateArray', JSON.stringify(aggregateArray), false)
                let ModelName = Models[model];
                let aggregation = ModelName.aggregate(aggregateArray);
                if (options) {
                    aggregation.options = options;
                }
                return yield aggregation.exec();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    aggregateDataWithPopulate(model, group, populateOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                let aggregate = yield ModelName.aggregate(group);
                let populate = yield ModelName.populate(aggregate, populateOptions);
                return populate;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    populateDataOnAggregate(model, aggregate, populateOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.populate(aggregate, populateOptions);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    bulkFindAndUpdate(bulk, query, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bulk.find(query).upsert().update(update, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    bulkFindAndUpdateOne(bulk, query, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bulk.find(query).upsert().updateOne(update, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    getDataPagination(model, query, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                return yield ModelName.find(query, projection).limit(options.limit).skip(options.skip);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
    updateOrUpsert(model, conditions, update, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ModelName = Models[model];
                if (options != undefined) {
                    options['writeConcern'] = { w: "majority", wtimeout: 5000 };
                }
                else {
                    options = { writeConcern: { w: "majority", wtimeout: 5000 } };
                }
                return yield ModelName.update(conditions, update, options);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    ;
}
exports.mongoDAOManager = mongoDAOManager;
;
//# sourceMappingURL=mongo_dao.js.map