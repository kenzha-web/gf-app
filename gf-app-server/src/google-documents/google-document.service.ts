import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleDocument } from './entities/google-document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import {
  REQUEST_FAILURE_MESSAGES,
  REQUEST_SUCCESS_MESSAGE,
} from 'src/common/constants/messages.constant';

@Injectable()
export class GoogleDocumentService {
  private readonly logger = new Logger(GoogleDocumentService.name);
  
  constructor(
    @InjectRepository(GoogleDocument)
    private readonly documentRepository: Repository<GoogleDocument>,
  ) {}
  
  public async getDocumentById(
    documentId: string,
    isUserAuth: boolean,
  ): Promise<GoogleDocument> {
    if (!isUserAuth) {
      this.logger.error(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
      throw new UnauthorizedException(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
    }
    
    try {
      // Подгрузим связанные вопросы (relations: ['questions'])
      const document = await this.documentRepository.findOne({
        where: { id: documentId },
        relations: ['questions'],
      });
      
      if (!document) {
        throw new NotFoundException(`Document with ID ${documentId} not found`);
      }
      
      this.logger.log(REQUEST_SUCCESS_MESSAGE.DOCUMENT_DATA_FETCHED);
      return document;
    } catch (error) {
      this.logger.error(
        REQUEST_FAILURE_MESSAGES.DOCUMENT_DATA_FETCH_FAILED,
        error?.message,
      );
      throw new InternalServerErrorException(error?.message);
    }
  }
  
  public async getAllDocuments(
    userId: number,
    isUserAuth: boolean,
  ): Promise<GoogleDocument[]> {
    if (!isUserAuth) {
      this.logger.error(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
      throw new UnauthorizedException(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
    }
    
    try {
      const documents = await this.documentRepository.find({
        where: { createdByUserID: userId },
        select: ['id', 'documentName', 'createdOn', 'updatedOn'],
      });
      return documents;
    } catch (error) {
      this.logger.error(
        REQUEST_FAILURE_MESSAGES.DOCUMENT_DATA_FETCH_FAILED,
        error?.message,
      );
      throw new InternalServerErrorException(error?.message);
    }
  }
  
  public async createDocument(
    createDocumentDto: CreateDocumentDto,
    isUserAuth: boolean,
  ): Promise<GoogleDocument> {
    if (!isUserAuth) {
      this.logger.error(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
      throw new UnauthorizedException(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
    }
    
    try {
      const newDocument = this.documentRepository.create(createDocumentDto);
      // сохранение
      const savedDoc = await this.documentRepository.save(newDocument);
      this.logger.log(REQUEST_SUCCESS_MESSAGE.DOCUMENT_CREATED_SUCCESSFULLY);
      return savedDoc;
    } catch (error) {
      this.logger.error(
        REQUEST_FAILURE_MESSAGES.ERROR_IN_CREATING_NEW_DOCUMENT,
        error?.message,
      );
      throw new InternalServerErrorException(error?.message);
    }
  }
  
  public async updateDocument(
    documentId: string,
    updateDocumentDto: UpdateDocumentDto,
    isUserAuth: boolean,
  ): Promise<void> {
    if (!isUserAuth) {
      this.logger.error(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
      throw new UnauthorizedException(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
    }
    
    try {
      const existingDoc = await this.documentRepository.findOneBy({ id: documentId });
      if (!existingDoc) {
        throw new NotFoundException(`Document with ID ${documentId} not found`);
      }
      
      Object.assign(existingDoc, updateDocumentDto);
      existingDoc.updatedOn = new Date(); // при желании обновляем вручную
      
      await this.documentRepository.save(existingDoc);
      this.logger.log(REQUEST_SUCCESS_MESSAGE.DOCUMENT_UPDATED_SUCCESSFULLY);
    } catch (error) {
      this.logger.error(
        REQUEST_FAILURE_MESSAGES.UNABLE_TO_UPDATE_DOCUMENT,
        error?.message,
      );
      throw new InternalServerErrorException(error?.message);
    }
  }
  
  public async deleteDocument(
    documentId: string,
    isUserAuth: boolean,
  ): Promise<void> {
    if (!isUserAuth) {
      this.logger.error(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
      throw new UnauthorizedException(REQUEST_FAILURE_MESSAGES.UNAUTHORIZED_ACCESS);
    }
    
    try {
      const result = await this.documentRepository.delete({ id: documentId });
      if (result.affected === 0) {
        throw new NotFoundException(`Document with ID ${documentId} not found`);
      }
      this.logger.log(REQUEST_SUCCESS_MESSAGE.DOCUMENT_DELETED_SUCCESSFULLY);
    } catch (error) {
      this.logger.error(
        REQUEST_FAILURE_MESSAGES.DOCUMENT_DELETION_FAILED,
        error?.message,
      );
      throw new InternalServerErrorException(error?.message);
    }
  }
}
