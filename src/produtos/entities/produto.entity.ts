import { Subcategory } from '../../subcategory/entities/subcategory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
  })
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  price: number;
  @Column({
    nullable: false,
    default: 1,
    type: 'int',
  })
  quantities: number;
  @Column({
    nullable: false,
  })
  size: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  color: string;
  @Column({
    default: true,
    nullable: true,
  })
  is_active: boolean;

  @Column({
    nullable: true,
    type: 'text',
  })
  photo: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.produtos)
  subcategory: Subcategory;

  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
