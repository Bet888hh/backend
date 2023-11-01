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
exports.login = void 0;
const verification_1 = require("../verification/verification");
const mongoose_model_1 = require("../dbModel/mongoose.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => {
    const { username, password } = req.body;
    if (!password || !username) {
        res.status(404).json({ message: "no" });
    }
    mongoose_model_1.User.findOne({ username: username }).then((e) => __awaiter(void 0, void 0, void 0, function* () {
        if (!e) {
            res.status(404).json({ message: "username errato" });
        }
        else {
            /*  if ( ) {
              
              }  */
            bcrypt_1.default.compare(password, e.password).then((e) => {
                if (e) {
                    const token = (0, verification_1.sign)(username);
                    res.setHeader("authorization", token).status(200).end();
                }
                else {
                    res.status(404).json({ message: "password errata" });
                }
            });
        }
    }));
};
exports.login = login;
