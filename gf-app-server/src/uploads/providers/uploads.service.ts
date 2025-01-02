import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadFile } from '../interfaces/upload-file.interface';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { fileTypes } from '../enums/file-types.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../uploads.entity';
import { Repository } from 'typeorm';
import { Express } from 'express';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private s3: AWS.S3;
  private cloudFrontUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });

    this.cloudFrontUrl = this.configService.get<string>('AWS_CLOUDFRONT_URL');
  }

  async uploadFile(file: Express.Multer.File): Promise<{ path: string }> {
    const fileKey = `${uuidv4()}-${file.originalname}`;
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.upload(params).promise();

    return {
      path: `${this.cloudFrontUrl}/${fileKey}`,
    };
  }
}
