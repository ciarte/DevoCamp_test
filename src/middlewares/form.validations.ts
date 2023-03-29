import { check } from "express-validator";
import { Postulantes } from "../models/Postulantes";

console.log("form.validation");

export const validations = [
  check("name")
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
  check("email")
    .isEmail()
    .withMessage("Formato de email inválido")
    .notEmpty()
    .withMessage("Necesitamos un email para poder contactar contigo")
    .custom(async (email) => {
      let emailFound = await Postulantes.findOne({ email });
      if (emailFound)
        throw new Error(
          "El email que intentas utilizar ya se encuentra registrado en nuestra Base de Datos"
        );
    }),
  check("linkedin")
    .notEmpty()
    .withMessage("Es importante contar con tu perfil de linkedin")
    .trim()
    .toLowerCase()
    .custom((word) => {
      let match = word.includes("linkedin");
      if (!match) throw new Error("Ingresa una url de linkedin válida");
      return true;
    }),
  check("porfolio")
    .notEmpty()
    .withMessage("Es importante contar con tu perfil de linkedin")
    .trim()
    .toLowerCase(),
];
