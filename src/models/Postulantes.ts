import { model, Schema } from "mongoose";

const PostulanteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    apellido: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    dni: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    pais: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
  
}, {
    versionKey: false,
    timestamps: true,
    collection: 'Postulantes',
    minimize: true,
    strict: true 
});

export const Postulantes = model('Postulantes', PostulanteSchema);