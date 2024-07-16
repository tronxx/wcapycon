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

@Entity('avales')
export class Aval {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100})
    nombre: string;

    @Column({type: 'integer'})
    idnombre: number;

    @Column({type: 'varchar', length:100})
    direc: string;

    @Column({type: 'varchar', length:100})
    ciudad: string;

    @Column({type: 'varchar', length:100})
    telefono: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    cia: number;


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}
