import Specification from "../infra/typeorm/entities/Specification";

export interface ICreateCarDTO {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  id?: string;
  available?: boolean;
  specifications?: Specification[];
}
