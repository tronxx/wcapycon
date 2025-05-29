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

@Entity('car_corlarpzodet')
export class Car_corlarpzodet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idcorlarpzo: number;

    @Column({type: 'varchar', length:1, nullable: false})
    qom: string;

    @Column({type: 'integer'})
    nulets: number;

    @Column({type: 'integer'})
    activo: number;

    @Column({type: 'integer'})
    meses: number;

    @Column({type: 'integer'})
    idanucartera: number;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}