import { Router, Request, Response } from "express";
// import EmailController from '../controllers/Email';


export const router = Router();

router.get("/postulaciones", (_req, res) => {
  console.log(_req.body)
  res.send("test GET ruta postulaciones");
});

router.post("/postulaciones/post", (req: Request, res: Response) => {
  let bodyData = req.body;
  // const email = EmailController;
  // email.send(req,res);
  console.log(bodyData);

  res.status(201).json({ status: "ok" });
});

router.delete("/postulaciones", (_req, res) => {
  
  res.send("Nice");
});