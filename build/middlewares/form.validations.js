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
exports.validations = void 0;
const path_1 = __importDefault(require("path"));
const express_validator_1 = require("express-validator");
const Applicant_1 = require("../models/Applicant");
let extAllow = [".jpg", ".png", ".pdf", ".jpeg"];
let maxSize = 500000;
exports.validations = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Necesitamos tu nombre/s y apellido/s")
        .isLength({ min: 8, max: 100 })
        .withMessage("Tu nombre/s y apellido/s debe tener entre 8 y 100 caracteres")
        .matches(/^[a-zA-Z ]+$/)
        .withMessage("Tu nombre/s y apellido/s solo puede contener letras y espacios")
        .escape()
        .trim()
        .toLowerCase(),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Necesitamos un email para poder contactar contigo")
        .isEmail()
        .withMessage("Formato de email inválido")
        .trim()
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        let emailFound = yield Applicant_1.Applicant.findOne({ email });
        if (emailFound)
            throw new Error("El email que intentas utilizar ya se encuentra registrado en nuestra Base de Datos");
    })),
    (0, express_validator_1.body)("linkedin")
        .notEmpty()
        .withMessage("Es importante contar con tu perfil de linkedin")
        .trim()
        .toLowerCase()
        .custom((value) => {
        let match = value.includes("linkedin");
        if (!match)
            throw new Error("Ingresa una url de linkedin válida");
        return true;
    }),
    (0, express_validator_1.body)("porfolio")
        .notEmpty()
        .withMessage("Es importante contar con tu repo o porfolio")
        .trim(),
    (0, express_validator_1.body)("cv_file").custom((_value, { req }) => {
        var _a;
        if (!req.file)
            throw new Error("Debes adjuntar tu curriculum vitae");
        let ext = path_1.default.extname((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
        let extValidation = extAllow.includes(ext);
        if (!extValidation)
            throw new Error(`Extensiones de archivos permitidas ${extAllow.join("|")}`);
        if (req.file.size > maxSize)
            throw new Error("Tamaño de archivo permitido hasta 500 KB");
        return true;
    }),
];
