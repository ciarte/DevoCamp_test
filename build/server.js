"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDB_1 = require("./config/mongoDB");
const index_1 = __importDefault(require("./index"));
const PORT = index_1.default.get("port");
(0, mongoDB_1.mongoConnect)();
const server = index_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
