import app from "./src/app";
import { envConfig } from "./src/config/config";
import dbConfig from "./src/config/dbConfig";

async function startServer() {
  await dbConfig();
  const port = envConfig.port || 3001;
  app.listen(port, () => {
    console.log("Server has started at port:", port);
  });
}

startServer();
