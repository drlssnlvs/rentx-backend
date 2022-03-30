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

const category = {
  name: "Lorem ipsum",
  description: "Lorem ipsum dolor sit amet...",
};

const car = {
  name: "Lorem ipsum",
  description: "Lorem ipsum dolor sit amet...",
  dailyRate: 999,
  licensePlate: "XXX-0000",
  fineAmount: 999,
  brand: "XXXX",
  categoryId: null,
};

const paths = {
  cars: "/cars",
  categories: "/categories",
  sessions: "/sessions",
};

describe("Create Car", () => {
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

    const { body } = await request(app)
      .post(paths.sessions)
      .send({ ...user });

    adminToken = body.data.token;
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });

  it("should be able to create a new car", async () => {
    const { body: categoryResponse } = await request(app)
      .post(paths.categories)
      .send({ ...category })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    Object.assign(car, {
      categoryId: categoryResponse.data.id,
    });

    const { body, status } = await request(app)
      .post(paths.cars)
      .send({ ...car })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    expect(status).toBe(200);
    expect(body.r).toBe(true);
    expect(body.data).toHaveProperty("id");
  });

  it("should be not able to create a new car with existing licensePlate", async () => {
    Object.assign(category, {
      name: "newCategoryName",
    });

    const { body: categoryResponse } = await request(app)
      .post(paths.categories)
      .send({ ...category })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    Object.assign(car, {
      categoryId: categoryResponse.data.id,
    });

    const { body, status } = await request(app)
      .post(paths.cars)
      .send({ ...car })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    expect(status).toBe(400);
    expect(body.r).toBe(false);
  });
});
