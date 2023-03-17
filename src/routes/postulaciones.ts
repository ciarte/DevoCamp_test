
import  express  from "express";

export const router = express.Router();

//  Model
const Postulaciones = require('../models/Postulantes');

// GET all 
router.get('/', async (_req , res) => {
  const postulacione = await Postulaciones.find();
  res.json(postulacione);
});

// GET all 
router.get('/:name', async (req, res) => {
  try{
    const postulacione = await Postulaciones.findByName(req.params.name);
    res.json(postulacione);
  }catch(error) {
    res.status(500).json(error)
    return;
  }
  
});

// ADD a new 
router.post('/', async (req, res) => {
  try{
    const {name,email,linkedin,porfolio,presentationLetter,cv } = req.body;
    const postulacione = new Postulaciones({name,email,linkedin,porfolio,presentationLetter,cv});
    await postulacione.save();
    res.json({status: 'Postulaciones Saved'});
  }catch(error) {
    res.status(500).json(error)
    return;
  }
  
});

// UPDATE a new 
router.put('/:name', async (req, res) => {
  try{
    const { name,email,linkedin,porfolio,presentationLetter,cv } = req.body;
    const newPostulaciones = {name,email,linkedin,porfolio,presentationLetter,cv};
    await Postulaciones.findByNameAndUpdate(req.params.name, newPostulaciones);
    res.json({status: 'Postulaciones Updated'});
  }catch(error) {
    res.status(500).json(error)
    return;
  }
  
});
router.delete('/:name', async (req, res) => {
  try{
    await Postulaciones.findByNameAndRemove(req.params.name);
    res.json({status: 'Postulaciones Deleted'});
  }catch(error) {
    res.status(500).json(error)
    return;
  }
  
});



