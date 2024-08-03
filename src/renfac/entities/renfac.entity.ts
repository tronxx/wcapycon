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

@Entity('renfac')
export class Renfac {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idfactura: number;

    @Column({type: 'integer'})
    idventa: number;

    @Column({type: 'integer'})
    conse: number;


    @Column({type: 'varchar', length:13, nullable: false})
    codigo: string;

    @Column({type: 'varchar', length:100, nullable: false})
    descri: string;

    @Column({type: 'varchar', length:100, nullable: false})
    serie: string;

    @Column({type: 'integer'})
    folio: number;
    
    @Column({type: 'integer'})
    canti: number;
    
    @Column({type: 'double precision'})
    preciou: number;

    @Column({type: 'double precision'})
    importe: number;

    @Column({type: 'double precision'})
    piva: number;

    @Column({type: 'double precision'})
    iva: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}
