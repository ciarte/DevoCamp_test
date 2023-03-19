import { Router, Request, Response } from "express";
import EmailController from '../controllers/Email';
import createEmailApplicants from '../utils/conts';

export const router = Router();

router.get("/", (_req, res) => {
  res.send("test GET ruta postulaciones");
});

router.post("/", (req: Request, res: Response) => {
  const email = EmailController;

  if (Object.keys(req.body).length < 2) {
    res.status(400).send('Bad request');
    return;
  }

  const emailRequest = req;

  emailRequest.body = {
    to: req.body.email,
    subject: "Campamento Devocamp",
    message: createEmailApplicants(req.body.name),
  }
  
  email.send(emailRequest, res);
});
