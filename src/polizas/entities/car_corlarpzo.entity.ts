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

@Entity('car_corlarpzo')
export class Car_corlarpzo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:1, nullable: false})
    tiplazo: string;

    @Column({type: 'varchar', length:100, nullable: false, default:''})
    descri: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}
