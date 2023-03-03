import { Router } from "express";

export const router = Router();

router.get("/postulaciones", (_req, res) => {
  res.send("test ruta postulaciones");
});
router.post("/postulaciones", (req, res) => {
  let bodyData = req.body;

  res.status(201).json({ status: "ok" });
});
