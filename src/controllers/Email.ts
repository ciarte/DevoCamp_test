import { Request, Response } from 'express';
import Email from '../models/Email';
import config from '../config/email';
const nodemailer = require("nodemailer");

class EmailController {
    async send(req: Request, res: Response) {
        const { to, subject, message } = req.body;
        const email = new Email({ to, subject, message });
        await email.save();

        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.password,
            },
        });

        const mailOptions = {
            from: config.user,
            to: email.to,
            subject: email.subject,
            text: email.message,
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error al enviar el correo electrónico');
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
                res.send('Correo electrónico enviado');
            }
        });
    }
}

export default new EmailController();