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
const form_validations_1 = require("../middlewares/form.validations");
const express_validator_1 = require("express-validator");
const form_file_upload_1 = __importDefault(require("../middlewares/form.file.upload"));
const Email_1 = __importDefault(require("../utils/Email"));
const conts_1 = __importDefault(require("../utils/conts"));
const Applicant_1 = require("../models/Applicant");
const deleteUploadsContents_1 = __importDefault(require("../utils/deleteUploadsContents")); /* DELETES UPLOADING FILE IN UPLOADS FOLDER, NO THE FOLDER ITSELF NOR THE PREVIOUS FILES */
exports.router = (0, express_1.Router)();
// GET all
exports.router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicant = yield Applicant_1.Applicant.find();
        res.json(applicant);
    }
    catch (error) {
        res.status(500).json(error);
        return;
    }
}));
// GET all
exports.router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicant = yield Applicant_1.Applicant.findById(req.params.id);
        res.json(applicant);
    }
    catch (error) {
        res.status(500).json(error);
        return;
    }
}));
/* ADDS POSTULANTE AND SENDS EMAIL */
exports.router.post("/", form_file_upload_1.default.single("cv_file"), form_validations_1.validations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, linkedin, porfolio, presentationLetter, selectedButtons, } = req.body;
        let cv_file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        /* EXPRESS-VALIDATOR */
        const validationErrors = (0, express_validator_1.validationResult)(req);
        if (!validationErrors.isEmpty()) {
            (0, deleteUploadsContents_1.default)((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
            return res.status(400).json(validationErrors.mapped());
        }
        /* MONGOOSE */
        const application = new Applicant_1.Applicant({ name, email, linkedin, porfolio, presentationLetter, cv_file, listaSeccion: [selectedButtons], });
        const saveApplication = yield application.save();
        /* NODEMAILER */
        req.body = {
            to: email,
            subject: "Campamento Devocamp",
            message: (0, conts_1.default)(name, req),
        };
        Email_1.default.send(req, res);
        return res.status(201).json({
            saveApplication,
            status: "Ok",
            result: "Usuario creado y email enviado con éxito",
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
// UPDATE a new
exports.router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, linkedin, porfolio, presentationLetter, CV } = req.body;
        const newApplicant = {
            name,
            email,
            linkedin,
            porfolio,
            presentationLetter,
            CV,
        };
        yield Applicant_1.Applicant.findByIdAndUpdate(req.params.id, newApplicant);
        res.json({ status: "Postulación actualizada" });
    }
    catch (error) {
        res.status(500).json(error);
        return;
    }
}));
exports.router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Applicant_1.Applicant.findByIdAndRemove(req.params.id);
        res.json({ status: "Postulación eliminada" });
    }
    catch (error) {
        res.status(500).json(error);
        return;
    }
}));
