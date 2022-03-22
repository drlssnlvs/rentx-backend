import "./env";

import express from "express";
import signale from "signale";
import swaggerUi from "swagger-ui-express";

import swaggerConfig from "config/swagger.json";
import routes from "./routes";

import "../typeorm";

import "@shared/container/index";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(express.static("tmp"));

app.use(routes);

app.listen(3333, () => signale.success("server on"));
