import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const checkIfSpecificationAlreadyRegister =
      this.specificationRepository.findByName(name);

    if (checkIfSpecificationAlreadyRegister) {
      throw new Error("specification already register");
    }

    const specification = this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}
