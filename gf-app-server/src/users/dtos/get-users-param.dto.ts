import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUsersParamDto {
    @ApiPropertyOptional({
        description: "Get a user with a specefic id",
        example: "12"
    })
    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    id?: number;
}
