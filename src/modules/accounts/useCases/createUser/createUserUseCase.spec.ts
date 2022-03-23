import UsersRepositoryInMemory from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import CreateUserUseCase from "./createUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

const user = {
  name: "Lelantos",
  email: "lelantos@current.com.br",
  password: "drowssap",
  driverLicense: "abc",
};

describe("CreateUser", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be not able create a user with email already existing", async () => {
      expect(async() => {
          await createUserUseCase.execute(user)
          await createUserUseCase.execute(user)
      }).rejects.toBe(false)
  })

  it("should be able create user", async () => {
    const userCreated = await createUserUseCase.execute(user);

    expect(userCreated).toHaveProperty("id");
  });
});
