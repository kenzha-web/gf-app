"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'locaalhost',
    port: 5432,
    username: 'postgres',
    password: 'WQAdkt82',
    database: 'smesiback',
    entities: ['src/**/*.entity.js'],
    migrations: ['src/migrations/*.js'],
});
