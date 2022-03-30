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

describe("Create Rental", () => {
  let app: Application;
  let database: Connection;

  let dateProvider: IDateProvider;

  let userToken: string;
  let adminToken: string;
  let carId: string;

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
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });

  it("should be not able create a rent with nonexistent car", async () => {
    const rental = {
      carId: uuid(),
      expectReturnDate: dateProvider.addHours(dateProvider.dateNow(), 30),
    };

    const { body, status } = await request(app)
      .post(paths.rentals)
      .send({ ...rental })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(body.r).toBe(false);
    expect(status).toBe(400);
    expect(body.errors[0]).toBe("car does not exists");
  });

  it("should be not able create a rent with invalid time", async () => {
    const rental = {
      carId,
      expectReturnDate: dateProvider.addHours(dateProvider.dateNow(), 5),
    };

    const { body, status } = await request(app)
      .post(paths.rentals)
      .send({ ...rental })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(body.r).toBe(false);
    expect(status).toBe(400);
    expect(body.errors[0]).toBe("minimal time to rent is invalid");
  });

  it("should be able create a rent", async () => {
    const rental = {
      carId,
      expectReturnDate: dateProvider.addHours(dateProvider.dateNow(), 30),
    };

    const { body, status } = await request(app)
      .post(paths.rentals)
      .send({ ...rental })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    const checkStatusRentedCar = await database.query(
      `SELECT * FROM CARS WHERE id='${rental.carId}'`
    );

    expect(body.r).toBe(true);
    expect(status).toBe(200);
    expect(body.data).toHaveProperty("id");
    expect(checkStatusRentedCar.length).toBe(1);
    expect(checkStatusRentedCar[0].available).toBe(false);
  });

  it("should be not able create a rent if unavailable car", async () => {
    const rental = {
      carId,
      expectReturnDate: dateProvider.addHours(dateProvider.dateNow(), 30),
    };

    const { body, status } = await request(app)
      .post(paths.rentals)
      .send({ ...rental })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(body.r).toBe(false);
    expect(status).toBe(400);
    expect(body.errors[0]).toBe("car be already rented");
  });

  it("should be not able create a rent if user has open rent", async () => {
    const { body: categoryResponse } = await request(app)
      .post(paths.categories)
      .send({ name: "category2", description: "category2" })
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    Object.assign(car, { licensePlate: "ACS-1234" });

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

    const { body, status } = await request(app)
      .post(paths.rentals)
      .send({ ...rental })
      .set({
        Authorization: `Bearer ${userToken}`,
      });

    expect(body.r).toBe(false);
    expect(status).toBe(400);
    expect(body.errors[0]).toBe("user be already rent in progress");
  });
});
