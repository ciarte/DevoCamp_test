import { Router, Response, Request } from "express";
import { Empresas } from '../models/Empresas';
import upload from '../middlewares/empresasMulter'; /* MANAGES THE FILE UPLOAD */
import deleteUploadsContents from '../utils/deleteUploadsContents'; /* DELETES UPLOADING FILE IN UPLOADS FOLDER, NO THE FOLDER ITSELF NOR THE PREVIOUS FILES */
import validateBody from '../middlewares/empresasValidator'; /* EXPRESS VALIDATOR FOR /EMPRESAS POST REQUEST */
import { validationResult } from 'express-validator';
import EmailController from "../controllers/Email";
import createEmailApplicants from "../utils/conts";



export const router = Router();

router.get("/empresas", (_req, res) => {
  res.send("test ruta");
});

/* router.post("/empresas", async (req, res) => {
  try {
    req.body = {
      to: req.body.Email,
      subject: "correo enviado",
      message: createEmailApplicants(req.body.Email),
    };
    await EmailController.send(req, res);
    return res.status(201).json({
      status: "Ok",
      result: "email enviado con éxito",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}) */

/* ROUTE TO UPLOAD COMPANY INFORMATION */
router.post("/", upload.single("archivoAdjunto"), validateBody, async (req: Request, res: Response) => {
  try {
    const { interes, nombre, correo, tel, presentacion } = req.body;
    const archivoAdjunto = req.file;

    /* EXPRESS-VALIDATOR SECTIO */
    if (!validationResult(req).isEmpty()) {
      deleteUploadsContents(archivoAdjunto?.filename);
      return res.status(400).json({ errors: validationResult(req).array() });
    }
    /*  */

    /* MONGOOSE SECTION */
    if (!interes || !nombre || !correo || !tel || !presentacion || !archivoAdjunto) throw new Error("Faltan completar campos");
    const newEmpresa = new Empresas({ interes, nombre, correo, tel, presentacion, archivoAdjunto: archivoAdjunto.path, });
    const savedEmpresa = await newEmpresa.save();
    /*  */

    /* NODEMAILER SECTION */
    req.body = {
      to: correo,
      subject: "correo enviado",
      message: createEmailApplicants(correo),
    };
    await EmailController.send(req, res);
    /*  */

    return res.status(201).json({
      savedEmpresa, message: "Hemos recibido su solicitud",
      status: "Ok",
      result: "E-mail enviado con éxito",
    });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});



