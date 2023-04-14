import path from "path";
import { ValidationChain, body } from "express-validator";
import { Postulantes } from "../models/Postulantes";

let extAllow: string[] = [".jpg", ".png", ".pdf", ".jpeg"];
let maxSize: number = 500000;

export const validations: ValidationChain[] = [
  body("name")
    .notEmpty()
    .withMessage("Necesitamos tu nombre/s y apellido/s")
    .isLength({ min: 8, max: 100 })
    .withMessage("Tu nombre/s y apellido/s debe tener entre 8 y 100 caracteres")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage(
      "Tu nombre/s y apellido/s solo puede contener letras y espacios"
    )
    .escape()
    .trim()
    .toLowerCase(),
  body("email")
    .notEmpty()
    .withMessage("Necesitamos un email para poder contactar contigo")
    .isEmail()
    .withMessage("Formato de email inválido")
    .trim()
    .custom(async (email: string) => {
      let emailFound = await Postulantes.findOne({ email });
      if (emailFound)
        throw new Error(
          "El email que intentas utilizar ya se encuentra registrado en nuestra Base de Datos"
        );
    }),
  body("linkedin")
    .notEmpty()
    .withMessage("Es importante contar con tu perfil de linkedin")
    .trim()
    .toLowerCase()
    .custom((value: string) => {
      let match = value.includes("linkedin");
      if (!match) throw new Error("Ingresa una url de linkedin válida");
      return true;
    }),
  body("porfolio")
    .notEmpty()
    .withMessage("Es importante contar con tu repo o porfolio")
    .trim(),
  body("CV").custom((_value, { req }) => {
    if (!req.file) throw new Error("Debes adjuntar tu curriculum vitae");
    let ext = path.extname(req.file?.filename);
    let extValidation = extAllow.includes(ext);
    if (!extValidation)
      throw new Error(
        `Extensiones de archivos permitidas ${extAllow.join("|")}`
      );
    if (req.file.size > maxSize)
      throw new Error("Tamaño de archivo permitido hasta 500 KB");
    return true;
  }),
];
