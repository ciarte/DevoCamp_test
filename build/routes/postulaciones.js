"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get("/postulaciones", (_req, res) => {
    res.send("test ruta postulaciones");
});
exports.router.post("/postulaciones", (req, res) => {
    let bodyData = req.body;
    res.status(201).json({ status: "ok" });
});
