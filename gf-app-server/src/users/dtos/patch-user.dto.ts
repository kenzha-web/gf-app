import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { userRole } from "../enums/userRole.enum";

export class PatchUserDto extends PartialType(CreateUserDto){

    @ApiPropertyOptional({ description: "ID пользователя" })
    @IsNotEmpty()
    @IsOptional() // ID может быть необязательным, но если он есть, то он должен быть валидным
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(96)
    firstName: string;
    
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(96)
    lastName?: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(96)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(96)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'Minimum eight characters, at least one letter, one number and one special character'
    })
    password: string;

    @ApiPropertyOptional({
        description: "Role of the user",
        enum: userRole,
        default: userRole.USER,
    })
    @IsEnum(userRole)
    @IsOptional()
    role?: userRole;
}