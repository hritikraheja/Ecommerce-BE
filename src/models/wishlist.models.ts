//@ts-nocheck
import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "./../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";

export interface IWishlistModel extends Document {
  userId : Types.ObjectId,
  products : [
    {
        productId : Types.ObjectId
    }
  ]
}

export const WishlistSchema: any = new Schema({
  userId : {type : Types.ObjectId, required : true, ref : MONGO_DB_REF.USERS},
  products: [
    {
      productId: {
        type: Types.ObjectId,
        ref: MONGO_DB_REF.PRODUCTS,
        required: true,
      }
    },
  ],
});

export const Wishlist = model<IWishlistModel>(MONGO_DB_REF.WISHLIST, WishlistSchema);
