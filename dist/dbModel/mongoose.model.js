"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Spesa = exports.categorieSpese = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var categorieSpese;
(function (categorieSpese) {
    categorieSpese[categorieSpese["ALIMENTARI"] = 0] = "ALIMENTARI";
    categorieSpese[categorieSpese["CARBURANTE"] = 1] = "CARBURANTE";
    categorieSpese[categorieSpese["IMPOSTE_E_TASSE"] = 2] = "IMPOSTE_E_TASSE";
})(categorieSpese || (exports.categorieSpese = categorieSpese = {}));
;
/* export const blogSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number
    }
  });
 */
const SpesaSchema = new Schema({
    importo: Number,
    data: { type: Date, default: Date.now },
    descrizione: String,
    categoria: String
});
exports.Spesa = mongoose_1.default.model("Spesa", SpesaSchema);
const userSchema = new Schema({
    username: String,
    email: { type: String, required: true },
    password: String,
    nome: String,
    cognome: String,
});
exports.User = mongoose_1.default.model("User", userSchema);
