import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterFieldExpectReturnDateOnRentalsTable1648578106826
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("rentals", "expectReturnDate");

    await queryRunner.addColumn(
      "rentals",
      new TableColumn({
        name: "expectReturnDate",
        type: "timestamp",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("rentals", "expectReturnDate");

    await queryRunner.addColumn(
      "rentals",
      new TableColumn({
        name: "expectReturnDate",
        type: "timestamp",
        isNullable: true,
      })
    );
  }
}
