import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';

@Injectable()
export class UploadToAwsProvider {
  private s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  public async fileUpload(file: Express.Multer.File): Promise<string> {
    const key = `${uuidv4()}-${file.originalname}`;

    await this.s3.upload({
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }).promise();

    return key;
  }
}
