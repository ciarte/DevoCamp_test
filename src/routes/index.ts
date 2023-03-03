import { Router } from "express";
import { router as routerPostulaciones } from "./postulaciones";

const router = Router();

router.get("/postulaciones", routerPostulaciones);

export default router;
