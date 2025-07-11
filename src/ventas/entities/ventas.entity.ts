import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
    UpdateDateColumn,
    PrimaryColumn
  } from 'typeorm';
  import { Expose, Transform } from 'class-transformer';

@Entity('ventas')
@Unique(['codigo', 'cia'])
export class Ventas {
    @PrimaryColumn({ type: 'int', name: 'idventa' })  
    idventa: number;

    @Column({type: 'varchar', length:10, nullable: false})
    codigo: string;

    @Column({type: 'integer'})
    idcliente: number;

    @Column({type: 'date', nullable:false})
    @Transform(({ value }) => value.toISOString().split('T')[0], { toClassOnly: true })
    fecha: string;

    @Column({type: 'integer'})
    idtienda: number;

    @Column({type: 'varchar', length:1})
    siono: string;

    @Column({type: 'varchar', length:1})
    qom: string;

    @Column({type: 'varchar', length:3})
    ticte: string;

    @Column({type: 'double precision'})
    letra1: number;

    @Column({type: 'double precision'})
    enganc: number;

    @Column({type: 'integer'})
    nulets: number;

    @Column({type: 'double precision'})
    canle: number;

    @Column({type: 'double precision'})
    bonifi: number;

    @Column({type: 'double precision'})
    servicio: number;

    @Column({type: 'double precision'})
    precon: number;

    @Column({type: 'integer'})
    idvendedor: number;

    @Column({type: 'double precision'})
    comision: number;

    @Column({type: 'double precision'})
    descuento: number;

    @Column({type: 'double precision'})
    prodfin: number;

    @Column({type: 'integer'})
    idcarta: number;

    @Column({type: 'integer'})
    idfactura: number;

    @Column({type: 'integer'})
    idpromotor: number;

    @Column({type: 'double precision'})
    comisionpromotor: number;

    @Column({type: 'double precision'})
    cargos: number;

    @Column({type: 'double precision'})
    abonos: number;

    @Column({type: 'integer'})
    idubica: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'varchar', length:1})
    opcion: string;

    @Column({type: 'double precision'})
    piva: number;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
    @Column({type: 'date', nullable:true})
    @Transform(({ value }) => value.toISOString().split('T')[0], { toClassOnly: true })
    fechasaldo: string;

}
