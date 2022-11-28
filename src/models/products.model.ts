//@ts-nocheck
import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "./../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";

export interface IProductModel extends Document {
  name: string;
  categoryId: Types.ObjectId,
  description: string,
  brandId: Types.ObjectId,
  size: number,
  quantityReceived: number,
  quantitySold : number,
  originalMRP: number;
  vendorId : Types.ObjectId;
  inStock: boolean;
  createdOn: number;
}

export const ProductSchema: any = new Schema({
  name: { type: String },
  categoryId : {
    type : Types.ObjectId,
    ref : MONGO_DB_REF.CATEGORIES
  },
  brandId : {
    type : Types.ObjectId,
    ref : MONGO_DB_REF.BRAND
  },
  size : {type : Number},
  inStock: { type: Boolean, default : false },
  quantityReceived : {type : Number, default : 0},
  quantitySold : {type : Number, default : 0},
  originalMRP: { type: Number },
  vendorId : {type : Types.ObjectId, ref : MONGO_DB_REF.VENDORS},
  description: { type: String },
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
});

ProductSchema.index({ name: 1 });

export const Products = model<IProductModel>(
  MONGO_DB_REF.PRODUCTS,
  ProductSchema
);
