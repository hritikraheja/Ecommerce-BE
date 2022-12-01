import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";

export interface IPromocodeModel extends Document {
  name: String;
  description: String;
  discountPercentage: Number;
  minimumOrderValue: Number;
  createdOn: Number;
}

export const PromocodeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  minimumOrderValue: {
    type: Number,
    required: true,
  },
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
});

export const Promocode = model<IPromocodeModel>(
  MONGO_DB_REF.PROMOCODE,
  PromocodeSchema
);
