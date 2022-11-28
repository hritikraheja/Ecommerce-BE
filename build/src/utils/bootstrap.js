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
exports.BootClass = void 0;
const config = require("config");
const mongoose_1 = require("mongoose");
// fetch data from config file
const MONGO_URL = config.get("MONGO_URI");
class BootClass {
    static Boot() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("In Boot Class");
            yield BootClass.connectMongoDb();
        });
    }
    static connectMongoDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                mongoose_1.set("debug", true);
                mongoose_1.set("useFindAndModify", false);
                mongoose_1.connection.on("error", (err) => {
                    console.error("%s", err);
                }).on("close", (error) => { });
                mongoose_1.connect(MONGO_URL, {
                    useCreateIndex: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }, function (err) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return Promise.reject(err);
                        }
                        else {
                            console.info(`Connected to ${MONGO_URL}`);
                        }
                    });
                });
                return {};
            }
            catch (error) {
                console.log("error in mongo connection", error);
            }
        });
    }
}
exports.BootClass = BootClass;
//# sourceMappingURL=bootstrap.js.map