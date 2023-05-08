import { Router, Response, Request } from "express";
import { validations } from "../middlewares/form.validations";
import { validationResult } from "express-validator";
import upload from "../middlewares/form.file.upload";
import EmailController from "../utils/Email";
import createEmail from "../utils/conts";
import { Postulantes } from "../models/Postulantes";
import deleteUploadsContents from '../utils/deleteUploadsContents'; /* DELETES UPLOADING FILE IN UPLOADS FOLDER, NO THE FOLDER ITSELF NOR THE PREVIOUS FILES */

export const router = Router();

//  Model
const Postulaciones = Postulantes;

// GET all
 
 
router.get("/", async (_req, res) => {
  try {
    const postulacione = await Postulaciones.find();
    res.json(postulacione);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

// GET all
router.get("/:id", async (req, res) => {
  try {
    const postulacione = await Postulaciones.findById(req.params.id);
    res.json(postulacione);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

/* ADDS POSTULANTE AND SENDS EMAIL */
/**
 * Post track
 * @openapi
 * /postulante:
 *    post:
 *      tags:
 *        - postulantes
 *      summary: "Listar postulantes"
 *      description: Este endpoint es para listar los postulantes totales 
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/postulaciones"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - ffofofof: []
 */

router.post("/", upload.single("CV"), validations, async (req: Request, res: Response) => {
  try {
    const { name, email, linkedin, porfolio, presentationLetter, selectedButtons, } = req.body;
    let cv_file: string | undefined = req.file?.filename;

    /* EXPRESS-VALIDATOR */
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      deleteUploadsContents(req.file?.filename);
      return res.status(400).json(validationErrors.mapped());
    }
    /*  */

    /* MONGOOSE */
    const postulacione = new Postulantes({ name, email, linkedin, porfolio, presentationLetter, cv_file, listaSeccion: [selectedButtons], });
    const savePostulacione = await postulacione.save()
    /*  */

    /* NODEMAILER */
    req.body = {
      to: email,
      subject: "Campamento Devocamp",
      message: createEmail(name, req),
    };

    EmailController.send(req, res);
    return res.status(201).json({
      savePostulacione,
      status: "Ok",
      result: "Usuario creado y email enviado con éxito",
    });
    /*  */

  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE a new
router.put("/:id", async (req, res) => {
  try {
    const { name, email, linkedin, porfolio, presentationLetter, CV } =
      req.body;
    const newPostulaciones = {
      name,
      email,
      linkedin,
      porfolio,
      presentationLetter,
      CV,
    };
    await Postulaciones.findByIdAndUpdate(req.params.id, newPostulaciones);
    res.json({ status: "Postulaciones Updated" });
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Postulaciones.findByIdAndRemove(req.params.id);
    res.json({ status: "Postulaciones Deleted" });
  } catch (error) {
    res.status(500).json(error);
    return;
  }
});
