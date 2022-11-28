 //@ts-nocheck
import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";

export interface ICategoryModel extends Document {
  name : String,
  type : Number,
  description : String,
  createdOn : Number,
}

export const CategorySchema: any = new Schema({
  name : {type : String, required : true},
  type : {type : String, required : true},
  description : {type : String},
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
});

export const Categories = model<ICategoryModel>(MONGO_DB_REF.CATEGORIES, CategorySchema);
