import express from "express";

import categoriesRouter from "./routes/categoriesRouter";
import specificationsRouter from "./routes/specificationsRouter";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/specifications", specificationsRouter);

app.listen(3333, () => console.log("app on"));
