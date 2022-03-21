import express from "express";

import categoriesRouter from "./routes/categoriesRouter";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRouter);

app.listen(3333, () => console.log("app on"));
