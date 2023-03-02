import express from "express";
import cors from "cors";
import mongoConnect from "./config/mongoDB";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("port", 3000 || process.env.PORT);
let PORT = app.get("port");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoConnect();
