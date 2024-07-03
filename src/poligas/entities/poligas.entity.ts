import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    PrimaryColumn
  } from 'typeorm';

@Entity('poligas')

export class Poligas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idalmacen: number;

    @Column({type: 'date', nullable: false})
    fecha: string;

    @Column({type: 'integer'})
    idusuario: number;

    @Column({type: 'double precision'})
    importe: number;

    @Column({type: 'double precision'})
    iva: number;

    @Column({type: 'double precision'})
    total: number;

    @Column({type: 'double precision'})
    promkml: number;

    @Column({type: 'double precision'})
    litros: number;

    @Column({type: 'integer'})
    kmts: number;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'varchar', length:1})
    status: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
