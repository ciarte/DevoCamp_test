import { Router, Response, Request } from "express";
import { validations } from "../middlewares/form.validations";
import { validationResult } from "express-validator";
import upload from "../middlewares/form.file.upload";
import EmailController from "../utils/Email";
import createEmail from "../utils/conts";
import { Applicant } from "../models/Applicant";
import deleteUploadsContents from '../utils/deleteUploadsContents'; /* DELETES UPLOADING FILE IN UPLOADS FOLDER, NO THE FOLDER ITSELF NOR THE PREVIOUS FILES */

export const router = Router();

// GET all
 
 
router.get("/", async (_req, res) => {
  try {
    const applicant = await Applicant.find();
    res.json(applicant);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

// GET all
router.get("/:id", async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    res.json(applicant);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

/* ADDS POSTULANTE AND SENDS EMAIL */
router.post("/", upload.single("cv_file"), validations, async (req: Request, res: Response) => {
  try {
    const { name, email, linkedin, porfolio, presentationLetter, selectedButtons, } = req.body;
    let cv_file: string | undefined = req.file?.filename;

    /* EXPRESS-VALIDATOR */
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      deleteUploadsContents(req.file?.filename);
      return res.status(400).json(validationErrors.mapped());
    }

    /* MONGOOSE */
    const application = new Applicant({ name, email, linkedin, porfolio, presentationLetter, cv_file, listaSeccion: [selectedButtons], });
    const saveApplication = await application.save()

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

  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE a new
router.put("/:id", async (req, res) => {
  try {
    const { name, email, linkedin, porfolio, presentationLetter, CV } =
      req.body;
    const newApplicant = {
      name,
      email,
      linkedin,
      porfolio,
      presentationLetter,
      CV,
    };
    await Applicant.findByIdAndUpdate(req.params.id, newApplicant);
    res.json({ status: "Postulación actualizada" });
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Applicant.findByIdAndRemove(req.params.id);
    res.json({ status: "Postulación eliminada" });
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});
