import app from "./src/app";
import { envConfig } from "./src/config/config";
import dbConfig from "./src/config/dbConfig";
import { Server } from "socket.io";

async function startServer() {
  await dbConfig();
  const port = envConfig.port || 3001;
  const server = app.listen(port, () => {
    console.log(`Server has started at port: ${port}`);
  });
  const io = new Server(server);

  io.on("connection", (socket) => {
    // console.log(socket.id);
    socket.on("send", (data) => {
      console.log(data);
      socket.emit("response", {
        message: "Data received successfully.",
      });
    });
    console.log("Someone is connected!");
  });
}

startServer();
