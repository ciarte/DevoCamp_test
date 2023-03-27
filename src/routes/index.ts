import { Router } from "express";
import { router as routerPostulaciones } from "./postulaciones";
import { router as routerEmpresas } from "./empresas";

const router = Router();

router.use("/postulaciones", routerPostulaciones);
router.use("/empresas",routerEmpresas);
export default router;
