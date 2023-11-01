"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const spesaService_1 = require("../services/spesaService/spesaService");
class SpesaRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/add", spesaService_1.checkSpesa, spesaService_1.addSpesa);
        /*this.router.get("/:id", gamesController.getOne)
            this.router.post("/",gamesController.create)
            this.router.delete('/:id',gamesController.delete)
        this.router.put('/:id',gamesController.update) */
    }
}
const spesaRoute = new SpesaRoute();
exports.default = spesaRoute.router;
