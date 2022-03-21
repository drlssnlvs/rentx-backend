import SpecificationRepository from "../../repositories/implementations/specificationsRepository";
import CreateSpecificationController from "./createSpecificationController";
import CreateSpecificationUseCase from "./createSpecificationUseCase";

const specificationsRepository = SpecificationRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export default createSpecificationController;
