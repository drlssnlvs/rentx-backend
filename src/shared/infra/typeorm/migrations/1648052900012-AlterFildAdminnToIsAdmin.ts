import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterFildAdminnToIsAdmin1648052900012
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn("users", "admin");

    queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "isAdmin",
        type: "boolean",
        isNullable: true,
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
      })
    );
  }
}
