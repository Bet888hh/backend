"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "your-secret-key"; // Dovresti usare una chiave segreta sicura in un ambiente di produzione.
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (req.url == "/login" || req.url == "/user/register") {
        next();
    }
    else if (!token) {
        return res.status(403).json({ message: "Token mancante" });
    }
    else {
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token non valido" });
            }
            //  decoded  { username: 'utente', iat: 1698479688, exp: 1698483288 }
            next();
        });
    }
}
exports.verifyToken = verifyToken;
function sign(username) {
    return jsonwebtoken_1.default.sign({ username }, secretKey, { expiresIn: "1h" });
}
exports.sign = sign;
