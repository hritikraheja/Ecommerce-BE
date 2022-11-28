import { BaseEntity } from "./base.entity";

import { MONGO_DB_REF } from "../constants/database_names";
import {
  USER_STATUS,
  TIME_CONSTANTS,
  LOGIN_TYPE,
} from "../constants/constants";
import {
  getLimitOffset,
  dateConstants,
  generateRandomOtp,
} from "../utils/helpers";
import { ERROR } from "../constants/error";

class ProductsClass extends BaseEntity {
  constructor() {
    super("Products");
  }

  async createProduct(params) {
    try {
      return await this.createOneEntity(params);
    } catch (error) {
      throw error;
    }
  }
}

export const ProductsEntity = new ProductsClass();
