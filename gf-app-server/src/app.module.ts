import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/user.entity';
import { Upload } from 'src/uploads/uploads.entity';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleDocumentModule } from 'src/google-documents/google-document.module';
import { GoogleDocument } from "src/google-documents/entities/google-document.entity";
import { Question } from "src/google-documents/entities/question.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [User, Upload, GoogleDocument, Question],
        logging: true,
      }),
    }),
    forwardRef(() => AuthModule),
    GoogleDocumentModule, // <-- Подключаем GoogleDocumentModule
  ],
})
export class AppModule {}
