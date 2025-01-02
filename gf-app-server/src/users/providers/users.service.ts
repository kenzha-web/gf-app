import {
  Inject,
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly dataSource: DataSource,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    return this.createUserProvider.createUser(createUserDto);
  }

  public async findAll(
    getUsersParamDto: GetUsersParamDto = {},
    limit: number = 20,
    page: number = 1,
  ) {
    try {
      const [users, total] = await this.usersRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        where: getUsersParamDto,
      });

      return {
        data: users,
        total,
        limit,
        page,
      };
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to fetch users at the moment. Please try again later.',
      );
    }
  }

  public async findOneById(id: number): Promise<User> {
    let user: User;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Database connection error');
    }

    if (!user) {
      throw new BadRequestException('User ID does not exist');
    }

    return user;
  }

  public async createMany(createUsersDto: CreateUserDto[]): Promise<User[]> {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  public async findOneByGoogleId(googleId: string): Promise<User> {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser): Promise<User> {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }

  public async updateUser(patchUserDto: PatchUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: patchUserDto.id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, patchUserDto);
    return this.usersRepository.save(user);
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async deleteUser(id: number): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`Пользователь с ID ${id} не найден`);
        }
        await this.usersRepository.remove(user);
  }
}
