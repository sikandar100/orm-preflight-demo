import { MigrationInterface, QueryRunner } from 'typeorm'

// What `typeorm migration:generate` writes after @Column({ length: 100 }) becomes
// @Column({ length: 255 }), plus a new index. orm-preflight should flag both.
export class WidenUserName1727100000000 implements MigrationInterface {
  name = 'WidenUserName1727100000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(255) NOT NULL`)
    await queryRunner.query(`CREATE INDEX "IDX_users_name" ON "users" ("name")`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_users_name"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`)
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`)
  }
}
