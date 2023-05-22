import { Applicant } from "../models/Applicant";
const {ModelCrud}= require ("../service/Applicant");

const ApplicantController = new Applicant(ModelCrud);

module.exports={  ApplicantController};
