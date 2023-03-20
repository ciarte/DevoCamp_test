import { Router } from "express";
import { router as routerPostulaciones } from "./postulaciones";

const router = Router();

router.use("/postulaciones", routerPostulaciones);

export default router;
