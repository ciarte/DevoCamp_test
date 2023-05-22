import { Company} from "../models/Company";
const  ModelCruds = require ("../service/Applicant");

const ApplicantController = new ModelCruds(Company);

export default ApplicantController;
