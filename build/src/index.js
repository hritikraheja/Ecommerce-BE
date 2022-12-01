"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const bootstrap_1 = require("./utils/bootstrap");
class App extends bootstrap_1.BootClass {
    constructor() {
        super();
        this.app = express();
    }
    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loadMiddlewares();
                yield App.Boot();
                this.app.use("/api/v1/products", require("./routes/v1/products.routes"));
                this.app.use("/api/v1/users", require("./routes/v1/users.routes"));
                this.app.use("/api/v1/brands", require("./routes/v1/brands.routes"));
                this.app.use("/api/v1/categories", require("./routes/v1/categories.routes"));
                this.app.use("/api/v1/vendors", require("./routes/v1/vendors.routes"));
                this.app.use("/api/v1/cart", require('./routes/v1/cart.routes'));
                this.app.use("/api/v1/wishlist", require('./routes/v1/wishlist.routes'));
                this.app.use("/api/v1/orders", require("./routes/v1/orders.routes"));
                this.app.use("/api/v1/promocodes", require('./routes/v1/promocodes.routes'));
                yield this.start();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    loadMiddlewares() {
        return __awaiter(this, void 0, void 0, function* () {
            // parse application/json
            this.app.use(bodyParser.json({ limit: "50mb" }));
            // parse application/x-www-form-urlencoded
            this.app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
            // this.app.use(function (req, res, next) {
            //   res.header("Access-Control-Allow-Origin", "*");
            //   // res.header("Access-Control-Allow-Credentials", "true");
            //   res.header(
            //     "Access-Control-Allow-Headers",
            //     "Origin,User-Agent, X-Requested-With, content-type,Content-Type, authtoken, access_token, access-token, Accept, authorization"
            //   );
            //   res.header(
            //     "Access-Control-Allow-Methods",
            //     "PUT, POST, PATCH, GET, DELETE, OPTIONS"
            //   );
            //   console.log(
            //     "--------------------------------request Details----------------------------------------"
            //   );
            //   console.log("end point", req.originalUrl);
            //   console.log("Req Type", req.method);
            //   console.log("Header", req.headers);
            //   console.log("auth-token", req.headers["auth-token"]);
            //   console.log("authorization", req.headers["authorization"]);
            //   console.log("user-agent", req.headers["user-agent"]);
            //   console.log("Host", req.headers["host"]);
            //   console.log("Req Body", req.body);
            //   console.log("Req Params", req.params);
            //   console.log("Req Query", req.query);
            //   console.log(
            //     "-----------------------------------------ENDS------------------------------------------"
            //   );
            //   if ("OPTIONS" === req.method) {
            //     res.send(200);
            //   } else {
            //     next();
            //   }
            // });
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server = yield this.app.listen(9000, () => {
                console.log(`Server running on ${9000}`);
            });
        });
    }
}
exports.App = App;
//# sourceMappingURL=index.js.map