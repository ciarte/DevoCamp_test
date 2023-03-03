"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postulaciones_1 = require("./postulaciones");
const router = (0, express_1.Router)();
router.get("/postulaciones", postulaciones_1.router);
exports.default = router;
