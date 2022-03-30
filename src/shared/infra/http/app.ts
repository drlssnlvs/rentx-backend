import "./env";
import "reflect-metadata";

import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerConfig from "@config/swagger.json";
import routes from "./routes";

import db from "../typeorm";

import "@shared/container/index";
import { Connection } from "typeorm";

export default class App {
  app: Application;

  constructor() {
    this.app = express();
  }

  async database(): Promise<Connection> {
    const database = await db();

    return database;
  }

  middlewares(): void {
    this.app.use(express.json());

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

    this.app.use(express.static("tmp"));

    this.app.use(routes);
  }

  async setup(): Promise<Application> {
    if (process.env.NODE_ENV !== "test") {
      console.log("caiu em test db");
      await this.database();
    }

    this.middlewares();

    return this.app;
  }
}
