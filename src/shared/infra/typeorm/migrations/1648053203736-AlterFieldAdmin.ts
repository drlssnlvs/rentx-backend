import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterFieldAdmin1648053203736
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "admin");

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "isAdmin",
        type: "boolean",
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "isAdmin");

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "admin",
        type: "boolean",
        isNullable: true,
      })
    );
  }
}
