import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddFieldTotalToRentals1648577883632
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "rentals",
      new TableColumn({
        name: "total",
        type: "numeric",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("rentals", "total");
  }
}
