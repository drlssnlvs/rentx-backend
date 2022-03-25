import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("carsImages")
export default class CarImage {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  carId: string;

  @Column()
  carImageId: string;

  @Column()
  carImageSrc: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
