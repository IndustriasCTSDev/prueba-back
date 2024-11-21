import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const uuidColumn = {
    name: 'id',
    type: 'char',
    length: '36',
    isPrimary: true,
    
}

const created_at = {
    name: 'created_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP', // Valor por defecto para la creación
    isNullable: false
}

const updated_at = {
    name: 'updated_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP', // Valor por defecto para la creación
    onUpdate: 'CURRENT_TIMESTAMP', // Actualización automática en cada modificación
    isNullable: false
}

export class ScaffoldingDatabase1730144863138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction()
        try {

            /**
             * TABLAS SIN DEPENDENCIAS
             */

            await queryRunner.createTable(new Table({
                name: 'ubications_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'direccion',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'latitude',
                        type: 'decimal',
                        precision: 10,
                        scale: 8,
                        isNullable: true
                    },
                    {
                        name: 'longitude',
                        type: 'decimal',
                        precision: 11,
                        scale: 8,
                        isNullable: true
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createTable(new Table({
                name: 'status_project_v1',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        isUnique: true,
                    }, created_at, updated_at

                ]
            }))

            await queryRunner.createTable(new Table({
                name: 'roles_v1',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    }, created_at, updated_at
                ]
            }))

            await queryRunner.createTable(new Table({
                name: 'credentials_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'email_verified',
                        type: 'boolean',
                        isNullable: true,
                        default: false
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    created_at, updated_at
                ]
            }))

            /**
             * TABLAS CON DEPENDENCIAS SIMPLES
             */
            await queryRunner.createTable(new Table({
                name: 'users_v1',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'rol_id',
                        type: 'bigint',
                        isNullable: false,
                        unsigned: true
                    },
                    {
                        name: 'credential_id',
                        type: 'char',
                        length: '36',
                        isNullable: true
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createForeignKey('users_v1',
                new TableForeignKey({
                    columnNames: ['credential_id'],
                    referencedTableName: 'credentials_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_users_v1_credential_id'
                })
            )

            await queryRunner.createForeignKey('users_v1',
                new TableForeignKey({
                    columnNames: ['rol_id'],
                    referencedTableName: 'roles_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_users_v1_rol_id'
                })
            )

            await queryRunner.createTable(new Table({
                name: 'business_unit_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'admin_id',
                        type: 'bigint',
                        isNullable: true,
                        unsigned: true
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createForeignKey('business_unit_v1',
                new TableForeignKey({
                    columnNames: ['admin_id'],
                    referencedTableName: 'users_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_business_unit_v1_admin_id'
                })
            )

            /**
             * TABLAS CON DEPENDENCIAS DE NIVEL INFERIOR
             */

            await queryRunner.createTable(new Table({
                name: 'project_v1',
                columns: [
                    {
                        ...uuidColumn,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'cliente',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'status_project_id',
                        type: 'bigint',
                        isNullable: false,
                        unsigned: true,
                    },
                    {
                        name: 'warranty',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'ubication_id',
                        type: 'char',
                        length: '36',
                        isNullable: true
                    },
                    {
                        name: 'old_ga',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createTable(new Table({
                name: 'bucket_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'business_unit_id',
                        type: 'char',
                        length: '36',
                        isNullable: false
                    },
                    {
                        name: 'project_id',
                        type: 'char',
                        length: '36',
                        isNullable: false,
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createTable(new Table({
                name: 'management_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'code',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'project_id',
                        type: 'char',
                        length: '36',
                        isNullable: false,
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createForeignKey('project_v1',
                new TableForeignKey({
                    columnNames: ['status_project_id'],
                    referencedTableName: 'status_project_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_project_v1_status_project_id'
                })
            )

            await queryRunner.createForeignKey('project_v1',
                new TableForeignKey({
                    columnNames: ['ubication_id'],
                    referencedTableName: 'ubications_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_project_v1_ubication_id'
                })
            )

            await queryRunner.createForeignKey('bucket_v1',
                new TableForeignKey({
                    columnNames: ['project_id'],
                    referencedTableName: 'project_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_bucket_v1_project_id'
                })
            )

            await queryRunner.createForeignKey('bucket_v1',
                new TableForeignKey({
                    columnNames: ['business_unit_id'],
                    referencedTableName: 'business_unit_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_bucket_v1_business_unit_id'
                })
            )

            await queryRunner.createForeignKey('management_v1',
                new TableForeignKey({
                    columnNames: ['project_id'],
                    referencedTableName: 'project_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_management_v1_project_id'
                })
            )

            await queryRunner.createTable(new Table({
                name: 'visitante_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'empresa',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'telefono',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'nit',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'last_otp',
                        type: 'bigint',
                        isNullable: true
                    },
                    {
                        name: 'last_access',
                        type: 'timestamp',
                        isNullable: true
                    },
                    created_at, updated_at
                ]
            }))
            /**
             * TABLAS CON REFERENCIAS JERARQUICAS Y DEPENDENCIAS A TABLAS EXISTENTES
             */

            await queryRunner.createTable(new Table({
                name: 'folder_v1',
                columns: [
                    { ...uuidColumn, },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'parent_folder_id',
                        type: 'char',
                        length: '36',
                        isNullable: true,
                    },
                    {
                        name: 'sequence',
                        type: 'int',
                        isNullable: false,
                        default: 0
                    },
                    {
                        name: 'icon',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'bucket_id',
                        type: 'char',
                        length: '36',
                        isNullable: false
                    },
                    created_at, updated_at
                ]
            }))
            // Crear índice para `parent_folder_id`
            await queryRunner.createIndex("folder_v1", new TableIndex({
                name: "IDX_folder_v1_parent_folder_id",
                columnNames: ["parent_folder_id"],
            }));

            await queryRunner.createForeignKey('folder_v1',
                new TableForeignKey({
                    columnNames: ['parent_folder_id'],
                    referencedTableName: 'folder_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_folder_v1_parent_folder_id'
                })
            )

            await queryRunner.createForeignKey('folder_v1',
                new TableForeignKey({
                    columnNames: ['bucket_id'],
                    referencedTableName: 'bucket_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_folder_v1_bucket_id'
                })
            )

            await queryRunner.createTable(new Table({
                name: 'visit_business_unit_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'user_id',
                        type: 'bigint',
                        isNullable: false,
                        unsigned: true
                    },
                    {
                        name: 'business_unit_id',
                        type: 'char',
                        length: '36',
                        isNullable: true
                    },
                    {
                        name: 'access_date',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'route_path',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'action',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    }, created_at, updated_at
                ]
            }))

            await queryRunner.createForeignKey('visit_business_unit_v1',
                new TableForeignKey({
                    columnNames: ['user_id'],
                    referencedTableName: 'users_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_visit_business_unit_v1_user_id'
                })
            )

            await queryRunner.createForeignKey('visit_business_unit_v1',
                new TableForeignKey({
                    columnNames: ['business_unit_id'],
                    referencedTableName: 'business_unit_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_visit_business_unit_v1_business_unit_id'
                })
            )

            /**
             * TABLAS QUE DEPENDEN DE FOLDER_V1 Y BUCKET_V1
             */

            await queryRunner.createTable(new Table({
                name: 'qr_visit_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'date_consult',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'bucket_id',
                        type: 'char',
                        length: '36',
                        isNullable: true
                    },
                    {
                        name: 'visitante_id',
                        type: 'char',
                        length: '36',
                        isNullable: false
                    },
                    {
                        name: 'route_path',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'latitud',
                        type: 'decimal',
                        precision: 10,
                        scale: 8,
                        isNullable: true
                    },
                    {
                        name: 'longitud',
                        type: 'decimal',
                        precision: 11,
                        scale: 8,
                        isNullable: true
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createForeignKey('qr_visit_v1',
                new TableForeignKey({
                    columnNames: ['bucket_id'],
                    referencedTableName: 'bucket_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_qr_visit_v1_bucket_id'
                })
            )

            await queryRunner.createForeignKey('qr_visit_v1',
                new TableForeignKey({
                    columnNames: ['visitante_id'],
                    referencedTableName: 'visitante_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_qr_visit_v1_visitante_id'
                })
            )

            await queryRunner.createTable(new Table({
                name: 'attachment_v1',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'file_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'file_path',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'file_size',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'file_type',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'bucket_id',
                        type: 'char',
                        length: '36',
                        isNullable: false
                    },
                    {
                        name: 'folder_id',
                        type: 'char',
                        length: '36',
                        isNullable: true,
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createForeignKey('attachment_v1',
                new TableForeignKey({
                    columnNames: ['bucket_id'],
                    referencedTableName: 'bucket_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_attachment_v1_bucket_id'
                })
            )

            await queryRunner.createForeignKey('attachment_v1',
                new TableForeignKey({
                    columnNames: ['folder_id'],
                    referencedTableName: 'folder_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_attachment_v1_folder_id'
                })
            )

            /**
             * TABLA DE TOKENS Y PLANTILLAS
             */

            await queryRunner.createTable(new Table({
                name: 'refresh_token_v1',
                columns: [
                    uuidColumn,
                    {
                        name: 'jwt',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'user_id',
                        type: 'bigint',
                        isNullable: false,
                        unsigned: true
                    },
                    {
                        name: 'exp',
                        type: 'timestamp',
                        isNullable: true
                    },
                    created_at, updated_at
                ]
            }))

            await queryRunner.createForeignKey('refresh_token_v1',
                new TableForeignKey({
                    columnNames: ['user_id'],
                    referencedTableName: 'users_v1',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    name: 'FK_refresh_token_v1_user_id'
                })
            )

            await queryRunner.createTable(new Table({
                name: 'template_v1',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'config',
                        type: 'json',
                        isNullable: false
                    },
                    created_at, updated_at
                ]
            }))


            // commit transaction now:
            await queryRunner.commitTransaction()
        } catch (error) {
            console.log(error);

            // Si hay un error, revertir la transacción
            await queryRunner.rollbackTransaction();
            throw error; // Lanza el error para que pueda ser manejado externamente
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();
        try {
            // Eliminar las tablas en orden inverso al que fueron creadas

            // Eliminar claves foráneas
            await queryRunner.dropForeignKey('attachment_v1', 'FK_attachment_v1_bucket_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropForeignKey('attachment_v1', 'FK_attachment_v1_folder_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('attachment_v1');

            await queryRunner.dropForeignKey('qr_visit_v1', 'FK_qr_visit_v1_bucket_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropForeignKey('qr_visit_v1', 'FK_qr_visit_v1_visitante_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('qr_visit_v1');

            await queryRunner.dropForeignKey('visit_business_unit_v1', 'FK_visit_business_unit_v1_user_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropForeignKey('visit_business_unit_v1', 'FK_visit_business_unit_v1_business_unit_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('visit_business_unit_v1');

            await queryRunner.dropForeignKey('folder_v1', 'FK_folder_v1_bucket_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropForeignKey('folder_v1', 'FK_folder_v1_parent_folder_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropIndex('folder_v1', 'IDX_folder_v1_parent_folder_id');
            await queryRunner.dropTable('folder_v1');

            await queryRunner.dropForeignKey('management_v1', 'FK_management_v1_project_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('management_v1');

            await queryRunner.dropForeignKey('bucket_v1', 'FK_bucket_v1_business_unit_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropForeignKey('bucket_v1', 'FK_bucket_v1_project_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('bucket_v1');

            await queryRunner.dropForeignKey('project_v1', 'FK_project_v1_status_project_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropForeignKey('project_v1', 'FK_project_v1_ubication_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('project_v1');

            await queryRunner.dropForeignKey('business_unit_v1', 'FK_business_unit_v1_admin_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('business_unit_v1');


            await queryRunner.dropForeignKey('refresh_token_v1', 'FK_refresh_token_v1_user_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('refresh_token_v1');

            await queryRunner.dropForeignKey('users_v1', 'FK_users_v1_credential_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropForeignKey('users_v1', 'FK_users_v1_rol_id'); // Reemplaza con el nombre real si es diferente
            await queryRunner.dropTable('users_v1');

            await queryRunner.dropTable('credentials_v1');
            await queryRunner.dropTable('roles_v1');
            await queryRunner.dropTable('status_project_v1');
            await queryRunner.dropTable('template_v1');
            await queryRunner.dropTable('visitante_v1');
            await queryRunner.dropTable('ubications_v1');

            // Commit transaction now:
            await queryRunner.commitTransaction();
        } catch (error) {
            // Si hay un error, revertir la transacción
            await queryRunner.rollbackTransaction();
            throw error; // Lanza el error para que pueda ser manejado externamente
        }
    }

}
