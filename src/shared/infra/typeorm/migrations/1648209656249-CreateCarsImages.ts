import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateCarsImages1648209656249
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "carsImages",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "carId",
            type: "uuid",
          },
          {
            name: "carImageId",
            type: "varchar",
          },
          {
            name: "carImageSrc",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCarsImages",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["carId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("carsImages");
  }
}
