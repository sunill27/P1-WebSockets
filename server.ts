import app from "./src/app";
import { envConfig } from "./src/config/config";
import dbConfig from "./src/config/dbConfig";
import { Server } from "socket.io";

let io: Server | undefined;

function startServer() {
  dbConfig();
  const port = envConfig.port || 3001;
  const server = app.listen(port, () => {
    console.log(`Server has started at port: ${port}`);
  });
  io = new Server(server);
}

//Funtion to export 'io'
function getSocketIo() {
  if (!io) {
    throw new Error("SocketIo is not initialized.");
  }
  return io;
}
startServer();
export { getSocketIo };
