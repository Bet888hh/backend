"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginService_1 = require("../services/loginService");
class LoginRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.route("/")
            .post(loginService_1.login);
    }
}
const loginRoute = new LoginRoute();
exports.default = loginRoute.router;
