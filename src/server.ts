import { mongoConnect } from "./config/mongoDB";
import app from "./index";
const PORT = app.get("port");

mongoConnect();

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
