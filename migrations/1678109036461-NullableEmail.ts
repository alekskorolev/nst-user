import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableEmail1678109036461 implements MigrationInterface {
    name = 'NullableEmail1678109036461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "email" SET NOT NULL`);
    }

}
