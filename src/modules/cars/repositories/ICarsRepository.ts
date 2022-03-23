import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import Car from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car | boolean>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
}
