import { ICreateCarsImagesDTO } from "@modules/cars/dtos/ICreateCarsImagesDTO";
import { getRepository, Repository } from "typeorm";
import { ICarsImagesRepository } from "../../../repositories/ICarsImagesRepository";

import CarImage from "../entities/CarImage";

export default class CategoriesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async deleteCarImageByCarImageId(carImageId: string): Promise<boolean> {
    await this.repository.delete({ carImageId })
    return true
  }

  async findImagesCarsByCarId(carId: string): Promise<CarImage[]> {
    const carImage = await this.repository.find({ where: { carId } });

    return carImage;
  }

  async create({
    carId,
    carImageId,
    carImageSrc,
  }: ICreateCarsImagesDTO): Promise<CarImage> {
    const carsImages = this.repository.create({
      carId,
      carImageId,
      carImageSrc,
    });

    await this.repository.save(carsImages);

    return carsImages;
  }
}
