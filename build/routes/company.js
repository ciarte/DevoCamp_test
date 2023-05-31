"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const Company_1 = require("../models/Company");
const form_file_upload_1 = __importDefault(require("../middlewares/form.file.upload")); /* MANAGES THE FILE UPLOAD */
const deleteUploadsContents_1 = __importDefault(require("../utils/deleteUploadsContents")); /* DELETES UPLOADING FILE IN UPLOADS FOLDER, NO THE FOLDER ITSELF NOR THE PREVIOUS FILES */
const empresasValidator_1 = __importDefault(require("../middlewares/empresasValidator")); /* EXPRESS VALIDATOR FOR /EMPRESAS POST REQUEST */
const express_validator_1 = require("express-validator");
const Email_1 = __importDefault(require("../utils/Email"));
const conts_1 = __importDefault(require("../utils/conts"));
exports.router = (0, express_1.Router)();
exports.router.get("/", (_req, res) => {
    res.send("test ruta");
});
/* ROUTE TO UPLOAD COMPANY INFORMATION */
exports.router.post("/", form_file_upload_1.default.single("attachedFile"), empresasValidator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { interest, name, email, phone, presentation } = req.body;
        const attachedFile = req.file;
        /* EXPRESS-VALIDATOR SECTIO */
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            (0, deleteUploadsContents_1.default)(attachedFile === null || attachedFile === void 0 ? void 0 : attachedFile.filename);
            return res.status(400).json({ errors: (0, express_validator_1.validationResult)(req).array() });
        }
        /* MONGOOSE SECTION */
        if (!interest || !name || !email || !phone || !presentation || !attachedFile)
            throw new Error("Faltan completar campos");
        const newCompany = new Company_1.Company({ interest, name, email, phone, presentation, attachedFile: attachedFile.path, });
        const savedCompany = yield newCompany.save();
        /* NODEMAILER SECTION */
        req.body = {
            to: email,
            subject: "Busqueda de aplicantes",
            message: (0, conts_1.default)(email, req),
        };
        yield Email_1.default.send(req, res);
        return res.status(201).json({
            savedCompany, message: "Hemos recibido su solicitud",
            status: "Ok",
            result: "E-mail enviado con éxito",
        });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
