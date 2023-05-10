import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";import swaggerUI from "swagger-ui-express";
import objConfigSwagger from './docs/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.set("port", 3000 || process.env.PORT);
app.use("/docs", swaggerUI.serve, swaggerUI.setup( objConfigSwagger ));

export default app;
