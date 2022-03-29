import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import Category from "./Category";
import Specification from "./Specification";

@Entity("cars")
export default class Car {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dailyRate: number;

  @Column()
  licensePlate: string;

  @Column()
  fineAmount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specificatiosToCars",
    joinColumns: [{ name: "carId" }],
    inverseJoinColumns: [{ name: "specificationId" }],
  })
  specifications: Specification[];

  @Column()
  categoryId: string;

  @Column()
  available?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
