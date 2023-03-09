import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1678106563581 implements MigrationInterface {
    name = 'Initial1678106563581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "credential" ("id" SERIAL NOT NULL, "login" character varying(120) NOT NULL, "password" character varying(60) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileId" uuid, CONSTRAINT "REL_e1d00e94d3f31093956fb9f970" UNIQUE ("profileId"), CONSTRAINT "PK_410b335f60f5333fc7be73494bc" PRIMARY KEY ("id", "login"))`);
        await queryRunner.query(`ALTER TABLE "credential" ADD CONSTRAINT "FK_e1d00e94d3f31093956fb9f9709" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "credential" DROP CONSTRAINT "FK_e1d00e94d3f31093956fb9f9709"`);
        await queryRunner.query(`DROP TABLE "credential"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
