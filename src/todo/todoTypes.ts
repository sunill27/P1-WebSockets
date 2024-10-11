export enum Status {
  COMPLETED = "completed",
  PENDING = "pending",
}

export interface ITodo {
  task: string;
  deadline: string;
  status: Status;
}
