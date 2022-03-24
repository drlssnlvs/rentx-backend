import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IAvailableCarsFiltersDTO } from "../dtos/IFilterCarsDTO";
import Car from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car | boolean>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  listAvailableCarsByFilters(data: IAvailableCarsFiltersDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}
