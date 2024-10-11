import mongoose from "mongoose";
import { ITodo, Status } from "./todoTypes";

const Schema = mongoose.Schema;

const todoSchema = new Schema<ITodo>({
  task: String,
  deadline: String,
  status: {
    type: String,
    enum: [Status.COMPLETED, Status.PENDING],
    default: Status.PENDING,
  },
});

export default mongoose.model("Todo", todoSchema);
