import App from "@shared/infra/http/app";
import { Application } from "express";
import { Connection } from "typeorm";
import db from "@shared/infra/typeorm";
import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

const user = {
  email: "admin@rentx.com",
  password: "admin",
  name: "lelantos",
  driverLicense: "abc",
};

const paths = {
  users: "/users",
};

describe("Create Specification", () => {
  let app: Application;
  let database: Connection;

  beforeAll(async () => {
    app = await new App().setup();
    database = await db();

    await database.runMigrations();
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });

  it("should be able to create a new user", async () => {
    const { body, status } = await request(app).post(paths.users).send({
      name: user.name,
      email: user.email,
      password: user.password,
      driverLicense: user.driverLicense,
    });

    expect(body.r).toBe(true);
    expect(status).toBe(200);
    expect(body.data).toHaveProperty("id");
  });

  it("should be not able to create a new existent user", async () => {
    const { body, status } = await request(app).post(paths.users).send({
      name: user.name,
      email: user.email,
      password: user.password,
      driverLicense: user.driverLicense,
    });

    expect(body.r).toBe(false);
    expect(status).toBe(400);
  });
});
