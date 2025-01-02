import {
    Controller,
    Get,
    Delete,
    Param,
    Patch,
    Post,
    Query,
    Body,
    ParseIntPipe,
    DefaultValuePipe,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:id?')
    @ApiOperation({
        summary: 'Получить пользователей',
    })
    @ApiResponse({
        status: 200,
        description: 'Пользователи успешно получены на основе запроса',
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Количество записей, возвращаемых за один запрос',
        example: 10,
    })
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'Номер страницы, которую вы хотите получить',
        example: 1,
    })
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        return this.usersService.findAll(getUsersParamDto, limit, page);
    }

    @Post()
    @Auth(AuthType.None)
    @ApiOperation({
        summary: 'Регистрация нового пользователя',
    })
    @ApiResponse({
        status: 201,
        description: 'Пользователь успешно зарегистрирован',
    })
    @ApiResponse({
        status: 400,
        description: 'Ошибка валидации или другой запрос',
    })
    @UseInterceptors(ClassSerializerInterceptor)
    public createUsers(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('create-many')
    @ApiOperation({
        summary: 'Создать нескольких пользователей',
    })
    @ApiResponse({
        status: 201,
        description: 'Пользователи успешно созданы',
    })
    public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
        const users = createManyUsersDto.users;
        return this.usersService.createMany(users);
    }

    @Patch()
    @ApiOperation({
        summary: 'Обновление информации о пользователе',
    })
    @ApiResponse({
        status: 200,
        description: 'Пользователь успешно обновлен',
    })
    public patchUser(@Body() patchUserDto: PatchUserDto) {
        return this.usersService.updateUser(patchUserDto);
    }
    @Delete(':id')
    @ApiOperation({
        summary: 'Удалить пользователя по ID',
    })
    @ApiResponse({
        status: 204,
        description: 'Пользователь успешно удален',
    })
    @ApiResponse({
        status: 404,
        description: 'Пользователь не найден',
    })
    public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.usersService.deleteUser(id);
    }
}
