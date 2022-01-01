import express, { Router } from "express";
import { json } from "body-parser";
import TodoRouter from "./routers/todoRouter";

const app = express();

// to parse the BODY REQUEST of JSON Type
app.use(json());
app.use("/todos", TodoRouter);

app.listen(3000);