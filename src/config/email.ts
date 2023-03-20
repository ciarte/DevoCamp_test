import "dotenv/config";

export default {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  user: <string>process.env.EMAIL,
  password: <string>process.env.PASSWORD,
};