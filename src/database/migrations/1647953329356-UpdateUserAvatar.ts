import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class UpdateUserAvatar1647953329356
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "avatarSrc",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "avatarId",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "avatarId");

    await queryRunner.dropColumn("users", "avatarSrc");
  }
}
