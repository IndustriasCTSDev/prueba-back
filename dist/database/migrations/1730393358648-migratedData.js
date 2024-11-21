"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigratedData1730393358648 = void 0;
const uuid_1 = require("uuid");
class MigratedData1730393358648 {
    async up(queryRunner) {
        try {
            const [allRoles, allStatusProject, allProjects, allUsers, allTemplates, allFolders, allAttachments] = await Promise.all([
                queryRunner.query(`SELECT id, name, created_at, updated_at FROM roles`),
                queryRunner.query(`SELECT id, name, created_at, updated_at FROM project_states`),
                queryRunner.query(`SELECT id, name, client, ga, warranty, state_id, created_at, updated_at, description FROM projects`),
                queryRunner.query(`SELECT id, name, email, email_verified_at, password, created_at, updated_at FROM users`),
                queryRunner.query(`SELECT id, name, treeData, created_at, updated_at FROM templates`),
                queryRunner.query(`SELECT id, name, description, sequence, project_id, icon, color, created_at, updated_at, parent FROM folders`),
                queryRunner.query(`SELECT id, filename, path, size, type, folder_id, created_at, updated_at FROM attachments`)
            ]);
            await queryRunner.manager.transaction(async (transactionalEntityManager) => {
                const businessUnitId = (0, uuid_1.v4)();
                await transactionalEntityManager.insert('business_unit_v1', { id: businessUnitId, name: 'proyectos' });
                await transactionalEntityManager.createQueryBuilder()
                    .insert()
                    .into("roles_v1")
                    .values(allRoles)
                    .execute();
                await transactionalEntityManager.createQueryBuilder()
                    .insert()
                    .into("status_project_v1")
                    .values(allStatusProject)
                    .execute();
                const projectInserts = [];
                const bucketInserts = [];
                for (const proj of allProjects) {
                    const { id, name, client, ga, warranty, state_id, created_at, updated_at, description } = proj;
                    projectInserts.push({
                        id,
                        name,
                        cliente: client,
                        status_project_id: state_id || 6,
                        warranty,
                        description,
                        ubication_id: null,
                        old_ga: ga,
                        created_at,
                        updated_at,
                    });
                    bucketInserts.push({
                        id: (0, uuid_1.v4)(),
                        name,
                        description: null,
                        business_unit_id: businessUnitId,
                        project_id: id,
                        created_at,
                        updated_at
                    });
                }
                await transactionalEntityManager.createQueryBuilder()
                    .insert()
                    .into("project_v1")
                    .values(projectInserts)
                    .execute();
                await transactionalEntityManager.createQueryBuilder()
                    .insert()
                    .into("bucket_v1")
                    .values(bucketInserts)
                    .execute();
                const userInserts = [];
                const credentialInserts = [];
                for (const user of allUsers) {
                    const credentialId = (0, uuid_1.v4)();
                    const { id, name, email, email_verified_at, password, created_at, updated_at } = user;
                    credentialInserts.push({
                        id: credentialId,
                        email,
                        email_verified: email_verified_at,
                        password,
                        created_at,
                        updated_at
                    });
                    userInserts.push({
                        id,
                        name,
                        rol_id: 2,
                        credential_id: credentialId,
                        created_at,
                        updated_at
                    });
                }
                await transactionalEntityManager.createQueryBuilder()
                    .insert()
                    .into("credentials_v1")
                    .values(credentialInserts)
                    .execute();
                await transactionalEntityManager.query(`INSERT INTO users_v1 (id, name, credential_id, rol_id, created_at, updated_at) VALUES ?`, [userInserts.map(user => [
                        user.id,
                        user.name,
                        user.credential_id,
                        user.rol_id,
                        user.created_at,
                        user.updated_at
                    ])]);
                await transactionalEntityManager.createQueryBuilder()
                    .insert()
                    .into("template_v1")
                    .values(allTemplates.map(({ id, name, treeData, created_at, updated_at }) => ({
                    id,
                    name,
                    config: treeData,
                    created_at,
                    updated_at
                })))
                    .execute();
                const bucketMap = new Map((await transactionalEntityManager.query(`SELECT project_id, id as bucket_id FROM bucket_v1`))
                    .map(({ project_id, bucket_id }) => [project_id, bucket_id]));
                const folderInserts = [];
                const parentUpdates = [];
                for (const folder of allFolders) {
                    const { id, name, description, sequence, project_id, icon, color, created_at, updated_at, parent } = folder;
                    const bucket_id = bucketMap.get(project_id);
                    if (!bucket_id)
                        continue;
                    folderInserts.push({
                        id,
                        name,
                        description,
                        parent_folder_id: null,
                        sequence,
                        icon,
                        color,
                        bucket_id,
                        created_at,
                        updated_at
                    });
                    if (parent)
                        parentUpdates.push({ id, parent });
                }
                await transactionalEntityManager.createQueryBuilder()
                    .insert()
                    .into("folder_v1")
                    .values(folderInserts)
                    .execute();
                for (const { id, parent } of parentUpdates) {
                    const parentExists = await transactionalEntityManager.query(`SELECT id FROM folder_v1 WHERE id = '${parent}'`);
                    await transactionalEntityManager.update("folder_v1", { id }, { parent_folder_id: parentExists.length ? parent : null });
                }
                const attachmentInserts = [];
                for (const att of allAttachments) {
                    const { id, filename, path, size, type, folder_id, created_at, updated_at } = att;
                    const bucket_id = (await transactionalEntityManager.query(`SELECT bucket_id FROM folder_v1 WHERE id = '${folder_id}'`))[0]?.bucket_id;
                    if (!bucket_id)
                        continue;
                    attachmentInserts.push({
                        id,
                        file_name: filename,
                        file_path: path,
                        file_size: size,
                        file_type: type,
                        bucket_id,
                        folder_id,
                        created_at,
                        updated_at
                    });
                }
                await transactionalEntityManager.query(`INSERT INTO attachment_v1 (id, file_name, file_path, file_size, file_type, bucket_id, folder_id, created_at, updated_at) VALUES ?`, [attachmentInserts.map(att => [
                        att.id,
                        att.file_name,
                        att.file_path,
                        att.file_size,
                        att.file_type,
                        att.bucket_id,
                        att.folder_id,
                        att.created_at,
                        att.updated_at
                    ])]);
            });
            const faltantesUsuariosQuery = `
                SELECT o.id, o.name, d.name
                FROM users o
                LEFT JOIN users_v1 d ON o.id = d.id
                WHERE d.id IS NULL OR o.name <> d.name;
            `;
            const validUsersResult = await queryRunner.query(faltantesUsuariosQuery);
            console.log("USUARIOS FALTANTES", validUsersResult.length);
            const faltantesProyectosQuery = `
                SELECT 
                    o.id AS origen_id, 
                    o.name AS origen_name, 
                    d.id AS destino_id, 
                    d.name AS destino_name
                FROM 
                    projects o
                LEFT JOIN 
                    project_v1 d ON o.id = d.id
                WHERE 
                    d.id IS NULL 
                    OR o.name <> d.name;
            `;
            const faltantesProjectsResult = await queryRunner.query(faltantesProyectosQuery);
            console.log("PROYECTOS FALTANTES", faltantesProjectsResult.length);
            const faltantesFoldersQuery = `
                SELECT 
                    o.id AS origen_id, 
                    o.name AS origen_name, 
                    d.id AS destino_id, 
                    d.name AS destino_name
                FROM 
                    folders o
                LEFT JOIN 
                    folder_v1 d ON o.id = d.id
                WHERE 
                    d.id IS NULL 
                    OR o.name <> d.name;
            `;
            const faltantesFoldersResult = await queryRunner.query(faltantesFoldersQuery);
            console.log("FOLDERS FALTANTES", faltantesFoldersResult.length);
            const faltantesAttachmentsQuery = `
                SELECT 
                    o.id AS origen_id, 
                    o.filename AS origen_name, 
                    d.id AS destino_id, 
                    d.file_name AS destino_name
                FROM 
                    attachments o
                LEFT JOIN 
                    attachment_v1 d ON o.id = d.id
                WHERE 
                    d.id IS NULL 
                    OR o.filename <> d.file_name;
            `;
            const faltantesAttachmentsResult = await queryRunner.query(faltantesAttachmentsQuery);
            console.log("ARCHIVOS FALTANTES", faltantesAttachmentsResult.length);
            const faltantesTemplatesQuery = `
                SELECT 
                    o.id AS origen_id, 
                    o.name AS origen_name, 
                    d.id AS destino_id, 
                    d.name AS destino_name
                FROM 
                    templates o
                LEFT JOIN 
                    template_v1 d ON o.id = d.id
                WHERE 
                    d.id IS NULL 
                    OR o.name <> d.name;
            `;
            const faltantesTemplatesResult = await queryRunner.query(faltantesTemplatesQuery);
            console.log("PLANTILLAS FALTANTES", faltantesTemplatesResult.length);
        }
        catch (error) {
            console.error("Migration error:", error);
        }
    }
    async down(queryRunner) {
        await queryRunner.manager.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.query(`DELETE FROM attachment_v1`);
            await transactionalEntityManager.query(`DELETE FROM folder_v1`);
            await transactionalEntityManager.query(`DELETE FROM template_v1`);
            await transactionalEntityManager.query(`DELETE FROM users_v1`);
            await transactionalEntityManager.query(`DELETE FROM credentials_v1`);
            await transactionalEntityManager.query(`DELETE FROM bucket_v1`);
            await transactionalEntityManager.query(`DELETE FROM project_v1`);
            await transactionalEntityManager.query(`DELETE FROM status_project_v1`);
            await transactionalEntityManager.query(`DELETE FROM roles_v1`);
            await transactionalEntityManager.query(`DELETE FROM business_unit_v1`);
        });
    }
}
exports.MigratedData1730393358648 = MigratedData1730393358648;
//# sourceMappingURL=1730393358648-migratedData.js.map