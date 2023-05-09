import { Request, Response } from 'express';
import Email from '../models/Email';
import config from '../config/email';
import nodemailer from 'nodemailer';

class EmailController {
    async send(req: Request, _res: Response) {
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

        transporter.sendMail(mailOptions, () => {
            /*  res.status(200).json({ status: 'success', message: 'E-mail send' }); */
        });
    }
}

export default new EmailController();