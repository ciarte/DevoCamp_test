import { body } from 'express-validator';

const validateBody = [
    body('interes').notEmpty().withMessage('El campo interes es obligatorio'),
    body('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
    body('correo').isEmail().withMessage('Por favor ingrese un email válido'),
    body('tel').notEmpty().withMessage('El campo tel es obligatorio'),
    body('presentacion').notEmpty().withMessage('El campo presentacion es obligatorio'),
    body('archivoAdjunto').custom((_value, { req }) => {
        if (!req.file) throw new Error('Debe adjuntar un archivo');
        return true;
    }),
];

export default validateBody;