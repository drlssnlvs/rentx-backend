import SpecificationsRepository from "../../repositories/implementations/SpecificationsRepository";
import CreateSpecificationController from "./createSpecificationController";
import CreateSpecificationUseCase from "./createSpecificationUseCase";

export default (): CreateSpecificationController => {
  const specificationsRepository = new SpecificationsRepository();
  const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationsRepository
  );
  const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
  );

  return createSpecificationController;
};
