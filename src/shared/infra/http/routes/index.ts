import { Router } from "express";

import categoriesRouter from "./categoriesRouter";
import specificationsRouter from "./specificationsRouter";
import usersRouter from "./usersRouter";
import sessionsRouter from "./sessionsRouter";
import carsRouter from "./carsRouter";
import rentalsRouter from "./rentalsRouter";

const routes = Router();

routes.use("/categories", categoriesRouter);
routes.use("/specifications", specificationsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/cars", carsRouter);
routes.use("/rentals", rentalsRouter);

export default routes;
