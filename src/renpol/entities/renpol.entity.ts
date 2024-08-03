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

@Entity('renpol')
export class Renpol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idpoliza: number;

    @Column({type: 'integer'})
    conse: number;

    @Column({type: 'integer'})
    idventa: number;

    @Column({type: 'varchar', length:1, nullable: false, default: ''})
    sino: string;

    @Column({type: 'varchar', length:100, nullable: false, default: ''})
    concepto: string;

    @Column({type: 'varchar', length:2, nullable: true, default: 'AB'})
    tipo: string;

    @Column({type: 'double precision'})
    rob: number;

    @Column({type: 'double precision'})
    importe: number;

    @Column({type: 'date', nullable:true})
    vence: string;

    @Column({type: 'double precision'})
    comision: number;

    @Column({type: 'integer'})
    dias: number;

    @Column({type: 'varchar', length:4, nullable: true, default: ''})
    tienda: string;

    @Column({type: 'varchar', length:4, nullable: true, default: ''})
    cobratario: string;

    @Column({type: 'integer'})
    letra: number;

    @Column({type: 'integer'})
    iduuid: number;

    @Column({type: 'integer'})
    idfactura: number;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}
