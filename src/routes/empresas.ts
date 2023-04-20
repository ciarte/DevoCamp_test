import { Router } from "express";


import EmailController from "../controllers/Email";
import createEmailApplicants from "../utils/conts";



export const router = Router();

router.get("/empresas", (_req, res) => {
  res.send("test ruta");
});

router.post("/empresas",async (req, res) => {
  //let bodyData = req.body;
   try{
    const email = EmailController;
    const emailRequest = req;

    emailRequest.body = {
      to: req.body.email,
      subject: "correo enviado",
      message: createEmailApplicants(req.body.Email),
    };
        
   email.send(emailRequest, res);
    return res.status(201).json({
      status: "Ok",
      result: "email enviado con éxito",
    });

   }catch (error) {
    res.status(500).json(error);
    return;
  }
     
})

 
 

 
 
  

  

  



