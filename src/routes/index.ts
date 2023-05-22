import { Router } from "express";
import { router as routerPostulaciones } from "./applicant";
import { router as routerEmpresas } from "./company";

//const router = Router();
 export const router = Router();

router.use("/applicants", routerPostulaciones);
router.use("/companies",routerEmpresas);
//module.exports={router}

//exports.default= router