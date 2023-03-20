import { model, Schema } from "mongoose";

const EmpresaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    Direccion: {
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
  
}, {
    versionKey: false,
    timestamps: true,
    collection: 'Empresas',
    minimize: true,
    strict: true 
});

export const Empresas = model('Empresas', EmpresaSchema);