import { model, Schema } from "mongoose";

const CompanySchema = new Schema({

    interest: {
        type: String,
        required: true,
    },

    name: {
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

    phone: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },

    presentation: {
        type: String,
        required: true,
        maxlength: 255
    },

    attachedFile: {
        type: String,
        trim: true,
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'Company',
    minimize: true,
    strict: true
});

export const Company = model('Company', CompanySchema);