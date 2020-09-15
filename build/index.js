"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
//
const app = express_1.default();
//
app.use(cors_1.default({ origin: true }));
app.use(express_1.default.json());
//
app.use("/users", userRouter_1.default);
//
const server = app.listen(3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    }
    else {
        console.error(`Falha ao rodar o servidor`);
    }
});
