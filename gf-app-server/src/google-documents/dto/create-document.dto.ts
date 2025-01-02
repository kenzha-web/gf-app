import { IsNotEmpty, IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: 'My new doc' })
  @IsString()
  @IsNotEmpty()
  documentName: string;
  
  @ApiProperty({ example: 'Description of the doc' })
  @IsString()
  @IsNotEmpty()
  documentDescription: string;
  
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  createdByUserID: number;
  
  @ApiProperty({
    description: 'Массив вопросов',
    type: Array,
    required: false,
  })
  @IsArray()
  @IsOptional()
  questions?: any[]; // можно сделать и отдельный DTO для вопросов
}
