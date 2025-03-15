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

@Entity('polizas')
@Unique(['tda', 'fecha', 'cia'])
export class Polizas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:4, nullable: false})
    tda: string;

    @Column({type: 'date', nullable:false})
    @Transform(({ value }) => value.toISOString().split('T')[0], { toClassOnly: true })
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