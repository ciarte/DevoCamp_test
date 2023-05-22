import { Router} from "express";

const CompanyController = require  ("../controller/Company");

export const router = Router();
 
router.get("/", CompanyController.getCompany );
router.post("/", CompanyController.postCompany);
