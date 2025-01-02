import { Module } from '@nestjs/common';
import { UploadController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { Upload } from './uploads.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UploadController],
  providers: [UploadsService, UploadToAwsProvider],
  imports: [TypeOrmModule.forFeature([Upload])],
  exports: [UploadsService],
})
export class UploadsModule {}
