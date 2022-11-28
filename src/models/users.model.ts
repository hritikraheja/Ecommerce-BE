//@ts-nocheck
import { Schema, Types, model, Document, SchemaTypes } from "mongoose";
import { dateConstants } from "./../utils/helpers";
import { MONGO_DB_REF } from "../constants/database_names";
import { ROLES } from "../constants/constants";

export interface IUserModel extends Document {
  email: String;
  name: String;
  password: String;
  createdOn: Number;
  updatedOn: Number;
  role: Number;
}

export const UserSchema: any = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password : {type : String, required : true},
  createdOn: { type: Number, default: dateConstants.currentTimeStamp() },
  updatedOn: { type: Number, default: dateConstants.currentTimeStamp() },
  role : {type : Number, default : ROLES.USER}
});

UserSchema.index({name : 1, email : 1})

export const Users = model<IUserModel>(
  MONGO_DB_REF.USERS,
  UserSchema
);
