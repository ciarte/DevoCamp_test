import path from "path";
import { Router, Response, Request } from "express";
import { validations } from "../middlewares/form.validations";
import { validationResult } from "express-validator";
import upload from "../middlewares/form.file.upload";
import EmailController from "../controllers/Email";
import createEmailApplicants from "../utils/conts";
import { unlinkSync, existsSync } from "fs";

import { Postulantes } from "../models/Postulantes";
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

// ADD a new and send an email
router.post(
  "/",
  upload.single("CV"),
  validations,
  async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    const {
      name,
      email,
      linkedin,
      porfolio,
      presentationLetter,
      CV_file,
      selectedButtons,
    } = req.body;
    let CV: string | undefined = req.file?.filename;

    if (!validationErrors.isEmpty()) {
      let dir = path.resolve(__dirname, "../../uploads");
      if (existsSync(`${dir}/${CV}`)) unlinkSync(`${dir}/${CV}`);
      return res.status(400).json(validationErrors.mapped());
    }

    const postulacione = new Postulantes({
      name,
      email,
      linkedin,
      porfolio,
      presentationLetter,
      CV_file,
      listaSeccion: [selectedButtons],
    });

    try {
      const savePostulacione = await postulacione.save();
      res.status(201).json(savePostulacione);
    } catch (error) {
      res.status(500).json(error);
      return;
    }

    await postulacione
      .save()
      .then(() => {
        const email = EmailController;
        const emailRequest = req;

        emailRequest.body = {
          to: req.body.email,
          subject: "Campamento Devocamp",
          message: createEmailApplicants(req.body.name),
        };
        console.log("email->", email);

        //email.send(emailRequest, res);
        return res.status(201).json({
          status: "Ok",
          result: "Usuario creado y email enviado con éxito",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });

    await postulacione
      .save()
      .then(() => {
        const email = EmailController;
        const emailRequest = req;

        emailRequest.body = {
          to: req.body.email,
          subject: "Campamento Devocamp",
          message: createEmailApplicants(req.body.name),
        };

        email.send(emailRequest, res);

        /* return res.status(201).json({
          status: "Ok",
          result: "Usuario creado y email enviado con éxito",
        }); */
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
    return false;
  }
);

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
