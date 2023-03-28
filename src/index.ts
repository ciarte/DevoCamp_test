import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.set("port", 3000 || process.env.PORT);

export default app;
