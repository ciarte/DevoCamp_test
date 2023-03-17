import express from "express";
import cors from "cors";
import { mongoConnect } from "./config/mongoDB";
import "dotenv/config";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.set("port", 3000 || process.env.PORT);
let PORT = app.get("port");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoConnect();
