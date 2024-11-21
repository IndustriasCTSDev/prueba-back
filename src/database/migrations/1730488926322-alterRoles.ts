import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRoles1730488926322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE roles_v1 SET name = 'superadmin' WHERE id = 1;
            UPDATE roles_v1 SET name = 'admin' WHERE id = 2;
            UPDATE roles_v1 SET name = 'viewer' WHERE id = 3;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE roles_v1 SET name = 'admin' WHERE id = 1;
            UPDATE roles_v1 SET name = 'client' WHERE id = 2;
            UPDATE roles_v1 SET name = 'project-manager' WHERE id = 3;
        `);
    }

}
