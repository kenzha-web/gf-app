import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { GoogleDocument } from './google-document.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ length: 500 })
  question: string;
  
  @Column({ nullable: true })
  questionType?: string;
  
  /**
   * Если у вас массив опций, можно хранить его в виде JSON
   * или вынести в отдельную сущность. Для упрощения: JSON-массив.
   */
  @Column({ type: 'jsonb', nullable: true })
  options?: any[];
  
  @Column({ default: false })
  open: boolean;
  
  @Column({ default: false })
  required: boolean;
  
  @Column({ type: 'boolean', nullable: true })
  answer?: boolean;
  
  @Column({ type: 'int', nullable: true })
  points?: number;
  
  // Обратная связь к документу
  @ManyToOne(() => GoogleDocument, (document) => document.questions, {
    onDelete: 'CASCADE',
  })
  document: GoogleDocument;
}
