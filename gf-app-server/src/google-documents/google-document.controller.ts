import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  DefaultValuePipe,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleDocumentService } from './google-document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';

@ApiTags('Документы')
@Controller('documents')
export class GoogleDocumentController {
  constructor(private readonly googleDocumentService: GoogleDocumentService) {}
  
  /**
   * Получить документ по ID
   * GET /documents/:documentId
   */
  @Get(':documentId')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Получить документ по ID' })
  @ApiResponse({ status: 200, description: 'Документ получен' })
  public async getDocumentById(
    @Param('documentId', ParseUUIDPipe) documentId: string,
    @ActiveUser() user: ActiveUserData, // вытаскиваем данные из токена
  ) {
    // Guard уже проверил токен, значит isUserAuth = true.
    // Для дополнительной проверки, что user.id === createdByUserID, нужно:
    // if (user.id !== document.createdByUserID) throw ForbiddenException(...)
    const isUserAuth = true;
    
    return await this.googleDocumentService.getDocumentById(
      documentId,
      isUserAuth,
    );
  }
  
  /**
   * Получить все документы (созданные конкретным пользователем)
   * GET /documents?userId=...
   */
  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Получить все документы пользователя' })
  public async getAllDocuments(
    @Query('userId', new DefaultValuePipe(0)) userId: number,
    @ActiveUser() user: ActiveUserData,
  ) {
    // isUserAuth = true;
    // Опять же, можно проверить (user.id === userId)
    return await this.googleDocumentService.getAllDocuments(userId, true);
  }
  
  /**
   * Создать новый документ
   * POST /documents
   */
  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Создать новый документ' })
  public async createDocument(
    @Body() createDocDto: CreateDocumentDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const isUserAuth = true;
    // Если нужно, можно переопределить createDocDto.createdByUserID = user.id
    return await this.googleDocumentService.createDocument(createDocDto, isUserAuth);
  }
  
  /**
   * Обновить документ
   * PUT /documents/:documentId
   */
  @Put(':documentId')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Обновить документ' })
  public async updateDocument(
    @Param('documentId', ParseUUIDPipe) documentId: string,
    @Body() updateDocDto: UpdateDocumentDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const isUserAuth = true;
    return await this.googleDocumentService.updateDocument(documentId, updateDocDto, isUserAuth);
  }
  
  /**
   * Удалить документ
   * DELETE /documents/:documentId
   */
  @Delete(':documentId')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Удалить документ' })
  public async deleteDocument(
    @Param('documentId', ParseUUIDPipe) documentId: string,
    @ActiveUser() user: ActiveUserData,
  ) {
    const isUserAuth = true;
    return await this.googleDocumentService.deleteDocument(documentId, isUserAuth);
  }
}
