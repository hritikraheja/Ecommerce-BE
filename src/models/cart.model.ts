//@ts-nocheck
import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "./../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";

export interface ICartModel extends Document {
  userId : Types.ObjectId,
  products : [
    {
        productId : Types.ObjectId,
        quantity : Number
    }
  ],
  promocodeId : Types.ObjectId,
  createdOn : Number,
  updatedOn : Number
}

export const CartSchema: any = new Schema({
  userId : {type : Types.ObjectId, required : true, ref : MONGO_DB_REF.USERS},
  products: [
    {
      productId: {
        type: Types.ObjectId,
        ref: MONGO_DB_REF.PRODUCTS,
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  promocodeId : {
    type : Types.ObjectId,
    ref : MONGO_DB_REF.PROMOCODE
  },
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
  updatedOn: { type: Number, default: dateConstants.currentTimeStamp() },
});

export const Cart = model<ICartModel>(MONGO_DB_REF.CART, CartSchema);
