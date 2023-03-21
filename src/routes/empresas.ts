import { Router } from "express";

export const router = Router();

router.get("/empresas", (_req, res) => {
  res.send("test ruta");
});
router.post("/empresas", (_req, res) => {
  //let bodyData = req.body;

  res.status(201).json({ status: "ok" });
});



