import UsersRepositoryInMemory from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import CreateUserUseCase from "../createUser/createUserUseCase";
import CreateSessionUseCase from "./createSessionUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createSessionUseCase: CreateSessionUseCase;

const user = {
  name: "Lelantos",
  email: "lelantos@current.com.br",
  password: "drowssap",
  driverLicense: "abc",
};

describe("Create Session", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createSessionUseCase = new CreateSessionUseCase(usersRepositoryInMemory);
  });

  it("should be not able create a session without a user existing", async () => {
    const session = await createSessionUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(session).toBe(false);
  });

  it("should be not able create a session with a incorrect password", async () => {
    await createUserUseCase.execute(user);

    const session = await createSessionUseCase.execute({
      email: user.email,
      password: "terrocni",
    });

    expect(session).toBe(false);
  });

  it("should be able create a session", async () => {
    await createUserUseCase.execute(user);

    const session = await createSessionUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(session).toHaveProperty("token");
    expect(session).toHaveProperty("user");
  });
});
