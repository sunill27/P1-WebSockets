import express, { Request, Response } from "express";
import path from "path";
const app = express();

import("../src/todo/todoController");

//Direction of "ejs" file:
app.set("views", path.join(__dirname, "views"));

// To set ejs in project:
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("home.ejs");
});

export default app;
