import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    Unique,
    PrimaryColumn
  } from 'typeorm';

@Entity('conceptos')
export class Conceptos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100})
    concepto: string;
}
