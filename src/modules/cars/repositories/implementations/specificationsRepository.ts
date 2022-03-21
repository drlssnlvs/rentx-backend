import SpecificationModel from "../../models/specificationsModel";

import {
  ISpecificationsRepository,
  ICreateSpecifiactionDTO,
} from "../ISpecificationsRepository";

export default class SpecificationRepository
  implements ISpecificationsRepository
{
  private specifications: SpecificationModel[];

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE)
      SpecificationRepository.INSTANCE = new SpecificationRepository();

    return SpecificationRepository.INSTANCE;
  }

  findByName(name: string): void | SpecificationModel {
    const findSpecification = this.specifications.find(
      (specification) => specification.name === name
    );

    if (findSpecification) {
      return findSpecification;
    }
  }

  create({ name, description }: ICreateSpecifiactionDTO): SpecificationModel {
    const specification = new SpecificationModel({ name, description });

    this.specifications.push(specification);

    return specification;
  }
}
