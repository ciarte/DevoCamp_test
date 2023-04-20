import { model, Schema } from "mongoose";

const EmpresaSchema = new Schema({

    interes: {
        type: String,
        required: true,
    },

    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    correo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    tel: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },

    presentacion: {
        type: String,
        required: true,
        maxlength: 255
    },

    archivoAdjunto: {
        type: String,
        trim: true,
    }

}, {
    versionKey: false,
    timestamps: true,
    collection: 'Empresas',
    minimize: true,
    strict: true
});

export const Empresas = model('Empresas', EmpresaSchema);