import { model, Schema } from "mongoose";

const ApplicantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    linkedin: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    porfolio: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    presentationLetter: {
      type: String,
      required: false,
      trim: true,
      maxlength: 300,
    },
    cv_file: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    listSection: {
      type: [String],
      default: [],
      trim: true,
      maxlength: 100,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "Applicant",
    minimize: true,
    strict: true,
  }
);

export const Applicant = model("Applicant", ApplicantSchema);
