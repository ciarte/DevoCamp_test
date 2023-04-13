import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";
import { Postulantes } from "./models/Postulantes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);


app.post('/postulaciones', async (req, res) => {
    const { name, email, linkedin, porfolio, presentationLetter, CV_file,  selectedButtons } = req.body;
    
    const postulacione = new Postulantes({
        name,
        email,
        linkedin,
        porfolio,
        presentationLetter,
        CV_file,
        listaSeccion: [selectedButtons]
    });
    
   try {
   
        const savePostulacione = await postulacione.save();
    res.status(201).json(savePostulacione);
    } catch (error) {
        res.status(500).json(error);
        return;
      }
    
});

app.set("port", 3000 || process.env.PORT);

export default app;