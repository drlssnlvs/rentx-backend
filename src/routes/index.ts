import { Router } from "express";

import categoriesRouter from "./categoriesRouter";
import specificationsRouter from "./specificationsRouter";

const routes = Router();

routes.use("/categories", categoriesRouter);
routes.use("/specifications", specificationsRouter);

export default routes;
