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

@Entity('facturas')
@Unique(['serie', 'numero', 'cia'])
export class Facturas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:4, nullable: false})
    serie: string;

    @Column({type: 'integer'})
    numero: number;

    @Column({type: 'integer'})
    idventa: number;

    @Column({type: 'date', nullable:false})
    @Transform(({ value }) => value.toISOString().split('T')[0], { toClassOnly: true })
    fecha: string;

    @Column({type: 'integer'})
    iduuid: number;

    @Column({type: 'integer'})
    idusocfdi: number;

    @Column({type: 'integer'})
    idmetodopago: number;

    @Column({type: 'double precision'})
    importe: number;

    @Column({type: 'double precision'})
    iva: number;

    @Column({type: 'double precision'})
    total: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'integer'})
    tipofac: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}
