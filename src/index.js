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
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const secretKey = "TeAmoChatGPT";
const payload = {
    userId: 12345,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com'
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
app.get('/token', (_req, res) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.json({ token: token });
});
app.post('/protegido', (_req, res) => {
    var [bearer, token] = "";
    const authHeader = _req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No se ha proporcionado el token de acceso." });
    }
    else {
        [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ message: "Token de autenticación no válido" });
        }
        else {
            try {
                const decoded = jwt.verify(token, secretKey);
                return res.json({
                    message: "Token válido, puedes acceder",
                    data: decoded
                });
            }
            catch (err) {
                return res.status(401).json({ message: "Token no válido" });
            }
        }
    }
});
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
