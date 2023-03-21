import { Request, Response } from 'express';
import Email from '../models/Email';
import config from '../config/email';
const nodemailer = require("nodemailer");

class EmailController {
    async send(req: Request, res: Response) {
        try {
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

            transporter.sendMail(mailOptions, (error: Error | null, _info: any) => {
                if (error) {
                    res.status(500).send('');
                } else {
                    res.status(200).json({ status: 'success', message: 'E-mail send' });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Failed to send email');
        }
    }
}

export default new EmailController();