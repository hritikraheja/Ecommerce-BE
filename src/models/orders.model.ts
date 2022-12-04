//@ts-nocheck
import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "./../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";
import { PAYMENT_STATUS, ORDER_DELIVERY_STATUS } from "../constants/constants";

export interface IOrderModel extends Document {
  userId : Types.ObjectId,
  orderPrice : Number,
  products : [
    {
        productId : Types.ObjectId,
        quantity : Number
    }
  ],
  promocodeId : Types.ObjectId,
  paymentStatus : Number,
  orderDeliveryStatus : Number,
  createdOn : Number,
}

export const OrderSchema: any = new Schema({
  userId : {type : Types.ObjectId, required : true, ref : MONGO_DB_REF.USERS},
  orderPrice : {type : Number, required : true},
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
  paymentStatus : {type : Number, default : PAYMENT_STATUS.PENDING},
  orderDeliveryStatus : {type : Number, default : ORDER_DELIVERY_STATUS.WAITING_FOR_APPROVAL},
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
});

export const Orders = model<IOrderModel>(MONGO_DB_REF.ORDER, OrderSchema);