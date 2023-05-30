"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = __importDefault(require("../models/Email"));
const email_1 = __importDefault(require("../config/email"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailController {
    send(req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { to, subject, message } = req.body;
            const email = new Email_1.default({ to, subject, message });
            yield email.save();
            const transporter = nodemailer_1.default.createTransport({
                host: email_1.default.host,
                port: email_1.default.port,
                secure: email_1.default.secure,
                auth: {
                    user: email_1.default.user,
                    pass: email_1.default.password,
                },
            });
            const mailOptions = {
                from: email_1.default.user,
                to: email.to,
                subject: email.subject,
                text: email.message,
            };
            transporter.sendMail(mailOptions, () => {
                /*  res.status(200).json({ status: 'success', message: 'E-mail send' }); */
            });
        });
    }
}
exports.default = new EmailController();
