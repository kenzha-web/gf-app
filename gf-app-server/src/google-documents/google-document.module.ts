import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleDocumentService } from './google-document.service';
import { GoogleDocumentController } from './google-document.controller';
import { GoogleDocument } from './entities/google-document.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleDocument, Question]),
  ],
  providers: [GoogleDocumentService],
  controllers: [GoogleDocumentController],
  exports: [GoogleDocumentService],
})
export class GoogleDocumentModule {}
