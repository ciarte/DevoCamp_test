
import {  Router } from "express";

const AplicantController =require  ("../controller/Applicant");
export const router = Router();

//const router = Router();
 
router.get("/", AplicantController.getApplicant );
router.post("/", AplicantController.postApplicant);

//module.exports= { router };