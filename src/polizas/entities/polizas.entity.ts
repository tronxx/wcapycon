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

@Entity('polizas')
@Unique(['tda', 'fecha', 'cia'])
export class Polizas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:4, nullable: false})
    tda: string;

    @Column({type: 'date', nullable:false})
    fecha: string;

    @Column({type: 'double precision'})
    bonif: number;

    @Column({type: 'double precision'})
    recar: number;

    @Column({type: 'double precision'})
    importe: number;

    @Column({type: 'integer'})
    idtienda: number;

    @Column({type: 'integer'})
    iduuid: number;

    @Column({type: 'integer'})
    idfactura: number;


    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}