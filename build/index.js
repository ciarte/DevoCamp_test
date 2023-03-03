"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import mongoConnect from "./config/mongoDB";
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/", routes_1.default);
app.set("port", 3000 || process.env.PORT);
let PORT = app.get("port");
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//mongoConnect();
