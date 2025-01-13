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

@Entity('codigoscaja')
@Unique(['tda', 'cia'])
export class Codigoscaja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:4, nullable: false})
    tda: string;

    @Column({type: 'varchar', length:100})
    nombre: string;

    @Column({type: 'varchar', length:100})
    direc: string;

    @Column({type: 'varchar', length:100})
    ciudad: string;

    @Column({type: 'varchar', length:100})
    estado: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'varchar', length:10})
    seriebon: string;

    @Column({type: 'varchar', length:10})
    serierec: string;

    @Column({type: 'varchar', length:10})
    seriefac: string;

    @Column({type: 'varchar', length:10})
    serieen: string;

    @Column({type: 'varchar', length:10})
    seriepol: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}