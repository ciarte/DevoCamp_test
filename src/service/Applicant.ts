import { Router, Response, Request } from "express";
import { validationResult } from "express-validator";
import upload from "../middlewares/form.file.upload";
import EmailController from "../utils/Email";
import createEmail from "../utils/conts";
import { Applicant } from "../models/Applicant";
import deleteUploadsContents from "../utils/deleteUploadsContents"; /* DELETES UPLOADING FILE IN UPLOADS FOLDER, NO THE FOLDER ITSELF NOR THE PREVIOUS FILES */

 class ModelCrud {
  // GET all
  async getApplicant(_req: Request, res: Response) {
    try {
      const applicants = await Applicant.find();
      res.json(applicants);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  /* ADDS APPLICANT AND SENDS EMAIL */
   postApplicant  (req:any, res:any) {
    try {
      upload.single ("cv_file")(req, res, (err) => {
        if (err) {
          deleteUploadsContents(req.file?.filename);
          return res.status(400).json({ error: err.message });
        }

        const { name, email, linkedin, porfolio, presentationLetter, selectedButtons } = req.body;
        const cv_file: string | undefined = req.file?.filename;

        /* EXPRESS-VALIDATOR */
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          deleteUploadsContents(req.file?.filename);
          return res.status(400).json(validationErrors.mapped());
        }

        /* MONGOOSE */
        const application = new Applicant({
          name,
          email,
          linkedin,
          porfolio,
          presentationLetter,
          cv_file,
          listaSeccion: [selectedButtons],
        });
        const saveApplication =  application.save();

        /* NODEMAILER */
        req.body = {
          to: email,
          subject: "Campamento Devocamp",
          message: createEmail(name, req),
        };

        EmailController.send(req, res);
        return res.status(201).json({
          saveApplication,
          status: "Ok",
          result: "Usuario creado y email enviado con éxito",
        });
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}
module.exports={ModelCrud}