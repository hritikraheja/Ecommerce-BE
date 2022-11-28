"use strict";

const config = require("config");
import { connect, set, connection as db } from "mongoose";
import { dateConstants } from "./helpers";

// fetch data from config file
const MONGO_URL = config.get("MONGO_URI");

export class BootClass {
  private static DAO_PSQL: any;
  static async Boot() {
    console.log("In Boot Class");
    await BootClass.connectMongoDb();
  }

  private static async connectMongoDb() {
    try {
      set("debug", true);
      set("useFindAndModify", false);
      db.on("error", (err) => {
        console.error("%s", err);
      }).on("close", (error) => {});
      connect(
        MONGO_URL,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        async function (err) {
          if (err) {
            return Promise.reject(err);
          } else {
            console.info(`Connected to ${MONGO_URL}`);
          }
        }
      );

      return {};
    } catch (error) {
      console.log("error in mongo connection", error);
    }
  }
}
