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
exports.ProductsEntity = void 0;
const base_entity_1 = require("./base.entity");
class ProductsClass extends base_entity_1.BaseEntity {
    constructor() {
        super("Products");
    }
    createProduct(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.createOneEntity(params);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ProductsEntity = new ProductsClass();
//# sourceMappingURL=products.entity.js.map