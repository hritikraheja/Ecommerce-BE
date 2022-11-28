//@ts-nocheck
import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "./../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";
import { ROLES } from "../constants/constants";

export interface IVendorModel extends Document {
  email: String;
  name: String;
  supply: [{ productId: Types.ObjectId; quantity: Number }];
  createdOn: Number;
  updatedOn: Number;
}

export const VendorSchema: any = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  supply: [
    {
      productId: {
        type: Types.ObjectId,
        ref: MONGO_DB_REF.PRODUCTS,
      },
      quantity: { type: Number },
    },
  ],
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
  updatedOn: { type: Number, default: dateConstants.currentTimeStamp() },
});

VendorSchema.index({ name: 1, email: 1 });

export const Vendors = model<IVendorModel>(MONGO_DB_REF.VENDORS, VendorSchema);
