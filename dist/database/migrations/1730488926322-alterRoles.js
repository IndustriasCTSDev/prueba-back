"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterRoles1730488926322 = void 0;
class AlterRoles1730488926322 {
    async up(queryRunner) {
        await queryRunner.query(`
            UPDATE roles_v1 SET name = 'superadmin' WHERE id = 1;
            UPDATE roles_v1 SET name = 'admin' WHERE id = 2;
            UPDATE roles_v1 SET name = 'viewer' WHERE id = 3;
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            UPDATE roles_v1 SET name = 'admin' WHERE id = 1;
            UPDATE roles_v1 SET name = 'client' WHERE id = 2;
            UPDATE roles_v1 SET name = 'project-manager' WHERE id = 3;
        `);
    }
}
exports.AlterRoles1730488926322 = AlterRoles1730488926322;
//# sourceMappingURL=1730488926322-alterRoles.js.map