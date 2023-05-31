"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicant_1 = require("./applicant");
const company_1 = require("./company");
const router = (0, express_1.Router)();
router.use("/applicants", applicant_1.router);
router.use("/companies", company_1.router);
exports.default = router;
