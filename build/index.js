"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const src_1 = require("./src");
src_1.App.getInstance().init().then((response) => console.log('Application started'));
//# sourceMappingURL=index.js.map