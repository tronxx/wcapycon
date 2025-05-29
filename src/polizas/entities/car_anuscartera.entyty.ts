import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
    UpdateDateColumn
  } from 'typeorm';
  import { Expose, Transform } from 'class-transformer';

@Entity('car_anuscartera')
export class Car_anuscartera {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    anucartera: number;

    @Column({type: 'integer'})
    anuini: number;

    @Column({type: 'integer'})
    anufin: number;

    @Column({type: 'varchar', length:100, nullable: false})
    descri: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}