"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = exports.WishlistSchema = void 0;
//@ts-nocheck
const mongoose_1 = require("mongoose");
const database_names_1 = require("../constants/database_names");
exports.WishlistSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true, ref: database_names_1.MONGO_DB_REF.USERS },
    products: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                ref: database_names_1.MONGO_DB_REF.PRODUCTS,
                required: true,
            }
        },
    ],
});
exports.Wishlist = mongoose_1.model(database_names_1.MONGO_DB_REF.WISHLIST, exports.WishlistSchema);
//# sourceMappingURL=wishlist.models.js.map