import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDocumentDto {
  @ApiPropertyOptional({ example: 'My updated doc' })
  @IsString()
  @IsOptional()
  documentName?: string;
  
  @ApiPropertyOptional({ example: 'New description' })
  @IsString()
  @IsOptional()
  documentDescription?: string;
  
  @ApiPropertyOptional({
    description: 'Массив вопросов для обновления/замены',
    type: Array,
  })
  @IsArray()
  @IsOptional()
  questions?: any[];
}
