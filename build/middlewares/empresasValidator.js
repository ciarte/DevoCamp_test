"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateBody = [
    (0, express_validator_1.body)('interes').notEmpty().withMessage('El campo interes es obligatorio'),
    (0, express_validator_1.body)('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
    (0, express_validator_1.body)('correo').isEmail().withMessage('Por favor ingrese un email válido'),
    (0, express_validator_1.body)('tel').notEmpty().withMessage('El campo tel es obligatorio'),
    (0, express_validator_1.body)('presentacion').notEmpty().withMessage('El campo presentacion es obligatorio'),
    (0, express_validator_1.body)('archivoAdjunto').custom((_value, { req }) => {
        if (!req.file)
            throw new Error('Debe adjuntar un archivo');
        return true;
    }),
];
exports.default = validateBody;
