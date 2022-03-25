import { ICreateCarsImagesDTO } from "@modules/cars/dtos/ICreateCarsImagesDTO";
import CarImage from "@modules/cars/infra/typeorm/entities/CarImage";
import BaseUseCase from "@shared/commons/BaseUseCase";
import { files } from "@shared/commons/constants";
import { inject, injectable } from "tsyringe";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

@injectable()
export default class CreateCarsImagesUseCase extends BaseUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {
    super();
  }

  async execute({ carId, images }: ICreateCarsImagesDTO): Promise<CarImage[]> {

    const findIfImagesCarsAlreadyExists = await this.carsImagesRepository.findImagesCarsByCarId(carId)

    findIfImagesCarsAlreadyExists.map(async(image) => {
      await files.delete(image.carImageSrc.toString())
      await this.carsImagesRepository.deleteCarImageByCarImageId(image.carImageId.toString())
    })

    const promises = images.map(
      (item) =>
        new Promise((resolve) =>
          setTimeout(async () => {
            const imageCar = await this.carsImagesRepository.create({
              carId,
              carImageId: item.filename,
              carImageSrc: item.path,
            });

            resolve(imageCar);
          }, 1)

        )
    );

    const result = await Promise.all(promises) as CarImage[];

    return result;
  }
}
