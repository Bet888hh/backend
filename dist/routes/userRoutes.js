"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerService_1 = require("../services/registerService/registerService");
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/register", registerService_1.checkUserMiddlewares);
    }
}
const userRoute = new UserRoute();
exports.default = userRoute.router;
