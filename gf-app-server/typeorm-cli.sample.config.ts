import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'locaalhost',
    port: 5432,
    username: 'postgres',
    password: 'WQAdkt82',
    database: 'smesiback',
    entities: ['src/**/*.entity.js'],
    migrations: ['src/migrations/*.js'],
})
