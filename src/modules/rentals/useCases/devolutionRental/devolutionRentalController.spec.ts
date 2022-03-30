import App from "@shared/infra/http/app";
import { Application } from "express";
import { Connection } from "typeorm";
import db from "@shared/infra/typeorm";
import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import DateProvider from "@shared/container/providers/dateProvider/implementations/DateProvider";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";

const user = {
  email: "user@rentx.com",
  password: "user",
};

const admin = {
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
};

const paths = {
  cars: "/cars",
  categories: "/categories",
  sessions: "/sessions",
  users: "/users",
  rentals: "/rentals",
};

describe("Devolution Rental", () => {
  let app: Application;
  let database: Connection;

  let dateProvider: IDateProvider;

  let userToken: string;
  let adminToken: string;
  let carId: string;
  let rentalId: string;

  beforeAll(async () => {
    app = await new App().setup();
    database = await db();

    dateProvider = new DateProvider();

    await database.runMigrations();

    const id = uuid();
    const hashedPassword = await hash(admin.password, 8);

    await database.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", "createdAt", "updatedAt", "driverLicense" ) 
            values('${id}', 'admin', '${admin.email}', '${hashedPassword}', true, 'now()', 'now()', 'XXXXXX')
          `
    );

    await request(app)
      .post(paths.users)
      .send({ name: "user", driverLicense: "abc", ...user });

    const { body: userTokenResponse } = await request(app)
      .post(paths.sessions)
      .send({ ...user });

    const { body: adminTokenResponse } = await request(app)
      .post(paths.sessions)
      .send({ ...admin });

    userToken = userTokenResponse.data.token;
    adminToken = adminTokenResponse.data.token;

    const { body: categoryResponse } = await request(app)
      .post(paths.categories)
      .send({ ...category })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    const { body: carResponse } = await request(app)
      .post(paths.cars)
      .send({ categoryId: categoryResponse.data.id, ...car })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    carId = carResponse.data.id;

    const rental = {
      carId,
      expectReturnDate: dateProvider.addHours(dateProvider.dateNow(), 30),
    };

    const { body: rentalResult } = await request(app)
      .post(paths.rentals)
      .send({ ...rental })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    rentalId = rentalResult.data.id;
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });

  it("should be not able give back a nonexistent rental", async () => {
    const { body, status } = await request(app)
      .post(`${paths.rentals}/give-back/${uuid()}`)
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(body.r).toBe(false);
    expect(body.errors[0]).toEqual("rental does not exists");
    expect(status).toBe(400);
  });

  it("should be able give back a rental", async () => {
    const { body, status } = await request(app)
      .post(`${paths.rentals}/give-back/${rentalId}`)
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(body.r).toBe(true);
    expect(status).toBe(200);
    expect(dateProvider.parseISO(body.data.endDate) instanceof Date).toBe(true)
  });
});
