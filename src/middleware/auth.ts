import * as auth from "basic-auth";
import {ROLES} from "../constants/constants";
import * as config from "config";
import { sendError, copyObject, verifyJwtToken } from "../utils/helpers";
import { ERROR } from "../constants/error";

export class Auth {
  static async Authenticate(req, res, next) {
    // extract the name and password from basic authorization
    let credentails = auth(req);

    // verify the authorization credentials
    if (
      credentails &&
      credentails.name === config.get<string>("BASIC_AUTH_USER") &&
      credentails.pass === config.get<string>("BASIC_AUTH_PASSWORD")
    ) {
      next();
    } else {
      sendError(res, ERROR.UNAUTHORIZED_401);
    }
  }

  static async UserAuth(req, res, next) {
    try {
      if (!req.header("JWT_CERT")) {
        let errorData = copyObject(ERROR.UNAUTHORIZED_401);
        return res.status(errorData.code).send(errorData);
      }
      let token = req.header('JWT_CERT');
      let tokenData = await verifyJwtToken(token).catch((error) => {
        console.log("Error while verifying user auth token", error);
        throw ERROR.UNAUTHORIZED_401;
      });

      if (!tokenData) throw ERROR.UNAUTHORIZED_401;

      req.tokenData = tokenData;
      next();
    } catch (err) {
      console.log(err);
      let errorData = copyObject(ERROR.UNAUTHORIZED_401);
      return res.status(errorData.code).send(errorData);
    }
  }

  static async AdminAuth(req, res, next) {
    try {
      if (!req.header("JWT_CERT")) {
        let errorData = copyObject(ERROR.UNAUTHORIZED_401);
        return res.status(errorData.code).send(errorData);
      }
      let token = req.header('JWT_CERT');
      let tokenData = await verifyJwtToken(token).catch((error) => {
        console.log("Error while verifying user auth token", error);
        throw ERROR.UNAUTHORIZED_401;
      });

      if (!tokenData) throw ERROR.UNAUTHORIZED_401;
      req.tokenData = tokenData;
      if(tokenData.role != ROLES.ADMIN){
        let errorData = copyObject(ERROR.ADMIN_UNAUTHORISED);
        return res.status(errorData.code).send(errorData);
      }
      next();
    } catch (err) {
      console.log(err);
      let errorData = copyObject(ERROR.UNAUTHORIZED_401);
      return res.status(errorData.code).send(errorData);
    }
  }

  static async VendorAuth(req, res, next) {
    try {
      if (!req.header("JWT_CERT")) {
        let errorData = copyObject(ERROR.UNAUTHORIZED_401);
        return res.status(errorData.code).send(errorData);
      }
      let token = req.header('JWT_CERT');
      let tokenData = await verifyJwtToken(token).catch((error) => {
        console.log("Error while verifying user auth token", error);
        throw ERROR.UNAUTHORIZED_401;
      });

      if (!tokenData) throw ERROR.UNAUTHORIZED_401;
      req.tokenData = tokenData;
      if(tokenData.role == ROLES.USER){
        let errorData = copyObject(ERROR.VENDOR_UNAUTHORISED);
        return res.status(errorData.code).send(errorData);
      }
      next();
    } catch (err) {
      console.log(err);
      let errorData = copyObject(ERROR.UNAUTHORIZED_401);
      return res.status(errorData.code).send(errorData);
    }
  }
}
