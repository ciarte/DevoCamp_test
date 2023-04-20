import { Router, Response, Request } from "express";
import { Empresas } from '../models/Empresas';
import upload from '../middlewares/empresasMulter'; /* MANAGES THE FILE UPLOAD */
import deleteUploadsContents from '../utils/deleteUploadsContents'; /* DELETES FILES IN UPLOADS FOLDER, NO THE FOLDER ITSELF */
import validateBody from '../middlewares/empresasValidator'; /* EXPRESS VALIDATOR FOR /EMPRESAS POST REQUEST */
import { validationResult } from 'express-validator';


import EmailController from "../controllers/Email";
import createEmailApplicants from "../utils/conts";



export const router = Router();

router.get("/empresas", (_req, res) => {
  res.send("test ruta");
});

router.post("/empresas",async (req, res) => {
  //let bodyData = req.body;
   try{
    const email = EmailController;
    const emailRequest = req;

    emailRequest.body = {
      to: req.body.email,
      subject: "correo enviado",
      message: createEmailApplicants(req.body.Email),
    };
        
   email.send(emailRequest, res);
    return res.status(201).json({
      status: "Ok",
      result: "email enviado con éxito",
    });

   }catch (error) {
    res.status(500).json(error);
    return;
  }
     
})

 
 

 
 
  

  

  

/* ROUTE TO UPLOAD COMPANY INFORMATION */
router.post("/", upload.single("archivoAdjunto"), validateBody, async (req: Request, res: Response) => {
  try {
    if (!validationResult(req).isEmpty()) {
      deleteUploadsContents();
      return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { interes, nombre, correo, tel, presentacion } = req.body;
    const archivoAdjunto = req.file;
    if (!interes || !nombre || !correo || !tel || !presentacion || !archivoAdjunto) throw new Error("Faltan completar campos");
    const newEmpresa = new Empresas({ interes, nombre, correo, tel, presentacion, archivoAdjunto: archivoAdjunto.path, });
    const savedEmpresa = await newEmpresa.save();
    deleteUploadsContents();
    return res.status(201).json({ savedEmpresa, message: "Hemos recibido su solicitud" });
  } catch (error: any) {
    deleteUploadsContents();
    return res.status(500).send(error.message);
  }
});



