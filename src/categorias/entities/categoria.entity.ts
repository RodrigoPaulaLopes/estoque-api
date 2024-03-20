import { Subcategory } from '../../subcategory/entities/subcategory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({
    nullable: false,
    length: 100,
    unique: true,
  })
  name: string;
  @Column({
    default: true,
    nullable: false,
  })
  is_active?: boolean;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
