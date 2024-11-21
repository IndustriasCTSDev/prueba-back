"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
exports.default = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [path.join(__dirname, '../database/migrations/*{.ts,.js}')],
    synchronize: false,
    migrationsRun: false,
    supportBigNumbers: true,
    bigNumberStrings: false,
    multipleStatements: true,
    migrationsTransactionMode: 'none',
});
//# sourceMappingURL=ormconfig.js.map