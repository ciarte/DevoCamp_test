import { Router } from "express";
import { router as routerPostulaciones } from "./postulaciones";
import { router as routerEmpresas } from "./empresas";

const router = Router();

router.get("/postulaciones", routerPostulaciones);
router.get("/empresas", routerEmpresas);

export default router;
