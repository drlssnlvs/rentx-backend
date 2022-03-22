import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import Specification from "../../entities/Specification";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const checkIfSpecificationAlreadyRegister =
      await this.specificationsRepository.findByName(name);

    if (checkIfSpecificationAlreadyRegister) {
      throw new Error("specification already register");
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
