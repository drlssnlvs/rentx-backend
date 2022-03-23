import SpecificationsRepositoryInMemory from "@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory";
import CreateSpecificationUseCase from "./createSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

const specification = {
  name: "Auto Transmission",
  description: "8 speed automatic transmission",
};

describe("Create Specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory
    );
  });

  it("should be able create a new specification", async () => {
    await createSpecificationUseCase.execute(specification);

    const specificationCreated =
      await specificationsRepositoryInMemory.findByName(specification.name);

    expect(specificationCreated).toHaveProperty("id");
  });

  it("should be not able create a new specification if she already existing", async () => {
    await createSpecificationUseCase.execute(specification);

    expect(await createSpecificationUseCase.execute(specification)).toBe(false);
  });
});
