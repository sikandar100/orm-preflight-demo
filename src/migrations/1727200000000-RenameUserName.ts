import { MigrationInterface, QueryRunner } from 'typeorm'

// A contribution from a fork: renaming a column breaks the running code during a deploy, and
// dropping a table deletes its rows. orm-preflight should flag both.
export class RenameUserName1727200000000 implements MigrationInterface {
  name = 'RenameUserName1727200000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "full_name"`)
    await queryRunner.query(`DROP TABLE "legacy_sessions"`)
  }

  public async down(): Promise<void> {
    throw new Error('Irreversible: legacy_sessions and its rows are gone.')
  }
}
