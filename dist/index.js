"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const spesaRoutes_1 = __importDefault(require("./routes/spesaRoutes"));
const verification_1 = require("./verification/verification");
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
class Server {
    constructor() {
        this.host = "127.0.0.1";
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", 3000);
        this.app.set("host", this.host);
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use((req, res, next) => {
            if (req.headers['content-type'] !== 'application/json') {
                return res.status(400).json({ error: 'Content-Type non specificato' });
            }
            next(); // Prosegui con la richiesta se il Content-Type è corretto
        });
        this.app.use((0, express_1.json)());
        this.app.use((0, express_1.urlencoded)({ extended: false }));
        this.app.use(verification_1.verifyToken);
        mongoose_1.default.connect(`mongodb+srv://betto:123123!@cluster0.csnpalo.mongodb.net/`);
    }
    routes() {
        this.app.use("/spesa", spesaRoutes_1.default);
        this.app.use("/login", loginRoutes_1.default);
        this.app.use("/user", userRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), this.app.get("host"), () => {
            console.log("server run in ", this.app.get("port") + " ", this.app.get("host"));
        });
    }
}
const server = new Server();
server.start();
// Rotte
