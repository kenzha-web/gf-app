import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('documents')
export class GoogleDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ length: 255 })
  documentName: string;
  
  @Column({ type: 'text' })
  documentDescription: string;
  
  // Кто создал документ (ID пользователя)
  @Column({ type: 'int' })
  createdByUserID: number;
  
  @CreateDateColumn()
  createdOn: Date;
  
  @UpdateDateColumn()
  updatedOn: Date;
  
  /**
   * Один документ — много вопросов
   * onDelete: 'CASCADE' позволит при удалении документа удалять связанные вопросы
   */
  @OneToMany(() => Question, (question) => question.document, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  questions: Question[];
}
