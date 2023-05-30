"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    secure: Boolean(process.env.SECURE),
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
};
