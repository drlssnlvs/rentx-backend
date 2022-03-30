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
};

const specification = {
  name: "Lorem ipsum",
  description: "Lorem ipsum dolor sit amet...",
};

const paths = {
  specifications: "/specifications",
  sessions: "/sessions",
};

describe("Create Specification", () => {
  let app: Application;
  let database: Connection;

  let adminToken: string;

  beforeAll(async () => {
    app = await new App().setup();
    database = await db();

    await database.runMigrations();

    const id = uuid();
    const hashedPassword = await hash(user.password, 8);

    await database.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", "createdAt", "updatedAt", "driverLicense" ) 
        values('${id}', 'admin', '${user.email}', '${hashedPassword}', true, 'now()', 'now()', 'XXXXXX')
      `
    );

    const { body } = await request(app).post(paths.sessions).send({
      email: user.email,
      password: user.password,
    });

    adminToken = body.data.token;
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });

  it("should be not able create a new specification with missing token", async () => {
    const { status, body } = await request(app)
      .post(paths.specifications)
      .send({
        name: specification.name,
        description: specification.description,
      });

    expect(body.r).toBe(false);
    expect(status).toBe(401);
  });

  it("should be not able create a new specification with invalid token", async () => {
    const { status, body } = await request(app)
      .post(paths.specifications)
      .send({
        name: specification.name,
        description: specification.description,
      })
      .set({
        Authorization: "Bearer invalidToken",
      });

    expect(body.r).toBe(false);
    expect(status).toBe(403);
  });

  it("should be able to create a new specification", async () => {
    const { body, status } = await request(app)
      .post(paths.specifications)
      .send({
        name: specification.name,
        description: specification.description,
      })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    expect(body.r).toBe(true);
    expect(body.data.name).toBe(specification.name);
    expect(status).toBe(200);
  });

  it("should be not able create a new specification if she already existing", async () => {
    const { status, body } = await request(app)
      .post(paths.specifications)
      .send({
        name: specification.name,
        description: specification.description,
      })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    expect(body.r).toBe(false);
    expect(status).toBe(400);
  });
});
