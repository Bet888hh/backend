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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserMiddlewares = void 0;
const mongoose_model_1 = require("../../dbModel/mongoose.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10; // Il numero di "giri" per la crittografia (10 è un valore comune)
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_model_1.User.create(Object.assign(Object.assign({}, req.body), { password: yield bcrypt_1.default.hash(req.body.password, saltRounds) /* criptata... */ })).then(() => {
            res.end();
        });
    });
}
function checkIfAnotherUserexists(req, res, next) {
    mongoose_model_1.User.exists({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then((e) => {
        if (!e) {
            next();
        }
        else {
            res.status(404).json({ message: "utente già presente " });
        }
    });
}
function checkIfAllFieldAreHere(req, res, next) {
    const user = req.body;
    if (!user ||
        !user.username ||
        !user.email ||
        !user.password ||
        !user.nome ||
        !user.cognome) {
        res
            .status(404)
            .json({ message: "Almeno uno dei campi obbligatori è mancante" }); // Almeno uno dei campi obbligatori è mancante
    }
    next();
}
exports.checkUserMiddlewares = [
    checkIfAllFieldAreHere,
    checkIfAnotherUserexists,
    registerUser
];
