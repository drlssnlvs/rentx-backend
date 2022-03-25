import { ICreateCarsImagesDTO } from "../dtos/ICreateCarsImagesDTO";

import CarImage from "../infra/typeorm/entities/CarImage";

export interface ICarsImagesRepository {
  create(data: ICreateCarsImagesDTO): Promise<CarImage>;
  findImagesCarsByCarId(carId: string): Promise<CarImage[]>;
  deleteCarImageByCarImageId(carImageId: string): Promise<boolean>
}
