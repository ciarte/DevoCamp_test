//import { Router, Response, Request } from "express";
import { Company } from '../models/Company';
import upload from '../middlewares/form.file.upload'; /* MANAGES THE FILE UPLOAD */
import deleteUploadsContents from '../utils/deleteUploadsContents'; /* DELETES UPLOADING FILE IN UPLOADS FOLDER, NO THE FOLDER ITSELF NOR THE PREVIOUS FILES */
import validateBody from '../middlewares/empresasValidator'; /* EXPRESS VALIDATOR FOR /EMPRESAS POST REQUEST */
import { validationResult } from 'express-validator';
import EmailController from "../utils/Email";
import createEmail from "../utils/conts";
import { Router, Response, Request } from "express";



 class ModelCruds{
  
getCompany(_req, res) {
    res.send("test ruta");
  };

/* ROUTE TO UPLOAD COMPANY INFORMATION */
async postCompany(req: Request, res: Response) {
  upload.single("attachedFile"), validateBody
  try {
    const { interest, name, email, phone, presentation } = req.body;
    const attachedFile = req.file;

    /* EXPRESS-VALIDATOR SECTIO */
    if (!validationResult(req).isEmpty()) {
      deleteUploadsContents(attachedFile?.filename);
      return res.status(400).json({ errors: validationResult(req).array() });
    }

    /* MONGOOSE SECTION */
    if (!interest || !name || !email || !phone || !presentation || !attachedFile) throw new Error("Faltan completar campos");
    const newCompany = new Company({ interest, name, email, phone, presentation, attachedFile: attachedFile.path, });
    const savedCompany = await newCompany.save();

    /* NODEMAILER SECTION */
    req.body = {
      to: email,
      subject: "Busqueda de aplicantes",
      message: createEmail(email, req),
    };
    await EmailController.send(req, res);

    return res.status(201).json({
      savedCompany, message: "Hemos recibido su solicitud",
      status: "Ok",
      result: "E-mail enviado con éxito",
    });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

}
module.exports ={ModelCruds}