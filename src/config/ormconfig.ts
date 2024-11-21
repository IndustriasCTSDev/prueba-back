import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path'; 

dotenv.config(); // Cargar las variables de entorno

export default new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST, // Cargar desde .env
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [path.join(__dirname, '../database/migrations/*{.ts,.js}')], // Rutas corregidas para migraciones
    synchronize: false,
    migrationsRun: false,
    supportBigNumbers: true,
    bigNumberStrings: false,
    multipleStatements: true,
    migrationsTransactionMode: 'none',
});