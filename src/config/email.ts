import "dotenv/config";

export default {
  host: <string>process.env.HOST,
  port: Number(<string>process.env.PORT),
  secure: Boolean(<string>process.env.SECURE),
  user: <string>process.env.EMAIL,
  password: <string>process.env.PASSWORD,
};
