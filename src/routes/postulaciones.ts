import { Router } from "express";

import EmailController from "../controllers/Email";
import createEmailApplicants from "../utils/conts";

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

// ADD a new
router.post("/", async (req, res) => {
  const { name, email, linkedin,
    porfolio, presentationLetter, cv } = req.body;
  const postulacione = new Postulaciones({
    name,
    email,
    linkedin,
    porfolio,
    presentationLetter,
    cv,
  });

  await postulacione.save().then(() => {
    const email = EmailController;
    const emailRequest = req;

    emailRequest.body = {
      to: req.body.email,
      subject: "Campamento Devocamp",
      message: createEmailApplicants(req.body.name),
    };

    email.send(emailRequest, res);
  }).catch((error) => {
    res.status(500).json(error);
    return;
  });

});

// UPDATE a new
router.put("/:id", async (req, res) => {
  try {
    const { name, email, linkedin, porfolio, presentationLetter, cv } =
      req.body;
    const newPostulaciones = {
      name,
      email,
      linkedin,
      porfolio,
      presentationLetter,
      cv,
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
