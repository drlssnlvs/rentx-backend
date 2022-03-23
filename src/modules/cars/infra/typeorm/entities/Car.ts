import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import Category from "./Category";

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

  @Column()
  categoryId: string;

  @Column()
  available?: boolean;
}
