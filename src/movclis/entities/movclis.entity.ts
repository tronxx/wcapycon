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

@Entity('movclis')
export class Movclis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idventa: number;

    @Column({type: 'date', nullable:false})
    fecha: string;

    @Column({type: 'varchar', length:1, nullable: false})
    coa: string;

    @Column({type: 'integer'})
    idconcepto: number;

    @Column({type: 'integer'})
    idpoliza: number;

    @Column({type: 'integer'})
    consecutivo: number;

    @Column({type: 'varchar', length:2})
    tipopago: string;

    @Column({type: 'double precision'})
    recobon: number;

    @Column({type: 'double precision'})
    importe: number;

    @Column({type: 'varchar', length:4})
    cobratario: string;

    @Column({type: 'varchar', length:4})
    usuario: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    idcobratario: number;

    @Column({type: 'integer'})
    idusuario: number;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}

