//@ts-nocheck
import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";

export interface IBrandModel extends Document {
  name : String,
  moto : String,
  email : String,
  description : String,
  rating : Number,
  createdOn : Number,
  updatedOn : Number
}

export const BrandSchema: any = new Schema({
  name : {type : String, required : true, unique:true},
  email : {type : String, required : true},
  moto : {type : String},
  description : {type : String},
  rating : {type: Number, required : true},
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
  updatedOn: { type: Number, default: dateConstants.currentTimeStamp() },
});

export const Brands = model<IBrandModel>(MONGO_DB_REF.BRAND, BrandSchema);
