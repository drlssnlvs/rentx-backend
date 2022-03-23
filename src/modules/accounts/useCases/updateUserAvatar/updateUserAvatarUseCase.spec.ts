import UsersRepositoryInMemory from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import CreateUserUseCase from "../createUser/createUserUseCase";
import UpdateUserAvatarUseCase from "./updateUserAvatarUseCase";

let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

const user = {
  name: "Lelantos",
  email: "lelantos@current.com.br",
  password: "drowssap",
  driverLicense: "abc",
};

const file: any = {
  filename: "filename",
  path: "path",
};

describe("Update User Avatar", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able update user avatar", async () => {
    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

    await updateUserAvatarUseCase.execute(userCreated.id, file);

    const userUpdated = await usersRepositoryInMemory.findByEmail(user.email);

    expect(userUpdated).toHaveProperty("avatarId");
    expect(userUpdated).toHaveProperty("avatarSrc");
  });
});
