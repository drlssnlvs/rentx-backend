import SpecificationModel from "../models/specificationsModel";

import {
  ISpecificationsRepository,
  ICreateSpecifiactionDTO,
} from "./ISpecificationsRepository";

export default class SpecificationRepository
  implements ISpecificationsRepository
{
  private specifications: SpecificationModel[];

  constructor() {
    this.specifications = [];
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
