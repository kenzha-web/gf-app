import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneByGoogleId(googleId: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ googleId });

    if (!user) {
      throw new NotFoundException(`User with Google ID ${googleId} not found`);
    }

    return user;
  }
}
