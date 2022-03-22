import SpecificationRepository from "../../repositories/implementations/specificationsRepository";
import CreateSpecificationController from "./createSpecificationController";
import CreateSpecificationUseCase from "./createSpecificationUseCase";

export default (): CreateSpecificationController => {
  const specificationsRepository = new SpecificationRepository();
  const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationsRepository
  );
  const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
  );

  return createSpecificationController;
};
