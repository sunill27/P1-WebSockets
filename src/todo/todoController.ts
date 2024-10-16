import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModel from "./todoModel";

class Todo {
  private io = getSocketIo();
  constructor() {
    this.io.on("connection", (socket: Socket) => {
      console.log("New client connected!!");
      socket.on("addToDo", (data) => this.handleAddToDo(socket, data));
    });
  }

  //Add To Do:
  private async handleAddToDo(socket: Socket, data: any) {
    try {
      const { task, deadline, status } = data;
      await todoModel.create({
        task,
        deadline,
        status,
      });

      const todo = await todoModel.find();
      socket.emit("todo_updated", {
        status: "success",
        data: todo,
      });
    } catch (error) {
      socket.emit("todo_response", {
        status: "error",
        error,
      });
    }
  }
}

export default new Todo();
