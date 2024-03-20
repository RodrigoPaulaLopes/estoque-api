import { Categoria } from '../../categorias/entities/categoria.entity';
import { Produto } from '../../produtos/entities/produto.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity('subcategories')
export class Subcategory {
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
    nullable: true,
  })
  is_active?: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.subcategories, {
    nullable: false,
    cascade: true,
  })
  category: Categoria;

  @OneToMany(() => Produto, (produto) => produto.subcategory, {
    cascade: true,
  })
  produtos?: Produto[];

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
