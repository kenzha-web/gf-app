import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersCreateManyProvider {
    constructor(
        /**
         * Inject the datasource
         */
        private dataSource: DataSource,
    ) { }

    public async createMany(createUsersDto: CreateUserDto[]) {
        let newUsers: User[] = [];
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            // Connect the query ryunner to the datasource
            await queryRunner.connect();
            // Start the transaction
            await queryRunner.startTransaction();
        } catch (error) {
            throw new RequestTimeoutException('Could not connect to the database');

        }

        try {
            for (let user of createUsersDto) {
                let newUser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
            throw new ConflictException('Could not complete the transaction', {
                description: String(error),
            });
        } finally {
            try {
                // you need to release a queryRunner which was manually instantiated
                await queryRunner.release();
            } catch (error) {
                throw new RequestTimeoutException(
                    'Could not release the query runner connection',
                );
            }
        }

        return newUsers;
    }
}
