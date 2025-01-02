import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { Express } from 'express';

@ApiTags('Uploads') // Тег для Swagger
@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadToAwsProvider: UploadToAwsProvider) {}

  @Post('file')
  @ApiOperation({ summary: 'Upload a file to AWS S3' }) // Краткое описание
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully',
    schema: {
      example: {
        message: 'File uploaded successfully',
        fileKey: 'example-file-12345.png',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid file upload request' }) // Описание ошибки
  @ApiConsumes('multipart/form-data') // Указываем, что принимаем файлы
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadedFileKey = await this.uploadToAwsProvider.fileUpload(file);
    return { message: 'File uploaded successfully', fileKey: uploadedFileKey };
  }
}
