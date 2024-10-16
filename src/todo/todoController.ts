import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import todoModel from "./todoModel";
import { ITodo, Status } from "./todoTypes";

class Todo {
  private io = getSocketIo();
  constructor() {
    this.io.on("connection", (socket: Socket) => {
      console.log("New client connected!!");

      //To receive data while performing add operation:
      socket.on("addToDo", (data) => this.handleAddToDo(socket, data));

      //To receive data while performing delete operation:
      socket.on("deleteToDo", (data) => this.handleDeleteToDo(socket, data));

      //To receive data while performing delete operation:
      socket.on("updateToDoStatus", (data) =>
        this.handleUpdateToDo(socket, data)
      );
    });
  }

  //Add To Do:
  private async handleAddToDo(socket: Socket, data: ITodo) {
    try {
      const { task, deadline, status } = data;
      await todoModel.create({
        task,
        deadline,
        status,
      });

      const todo = await todoModel.find({ status: Status.PENDING });
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

  //Delete To Do:
  private async handleDeleteToDo(socket: Socket, data: { id: string }) {
    try {
      const { id } = data;
      const deletedToDo = await todoModel.findByIdAndDelete(id);
      if (!deletedToDo) {
        socket.emit("todo_response", {
          status: "error",
          message: "ToDo not found!",
        });
        return;
      }
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

  //Update To Do:
  private async handleUpdateToDo(
    socket: Socket,
    data: { id: string; status: Status }
  ) {
    try {
      const { id, status } = data;
      const updatedToDo = await todoModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!updatedToDo) {
        socket.emit("todo_response", {
          status: "error",
          message: "ToDo not found!",
        });
        return;
      }
      const todo = await todoModel.find({ status: Status.PENDING });
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
