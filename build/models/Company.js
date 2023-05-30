"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const CompanySchema = new mongoose_1.Schema({
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
exports.Company = (0, mongoose_1.model)('Company', CompanySchema);
