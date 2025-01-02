"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var _1735238811675_AddPriceColumnToProduct2_1 = require("./src/migrations/1735238811675-AddPriceColumnToProduct2");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'WQAdkt82',
    database: 'smesiback',
    entities: ['dist/**/*.entity.js'],
    migrations: [_1735238811675_AddPriceColumnToProduct2_1.AddPriceColumnToProduct21735238811675],
});
