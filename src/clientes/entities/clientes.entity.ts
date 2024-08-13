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

@Entity('clientes')
@Unique(['codigo', 'cia'])
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:20, nullable:false})
    codigo: string;

    @Column({type: 'integer',  default:1})
    idnombre: number;

    @Column({type: 'varchar', length:100})
    nombre: string;

    @Column({type: 'varchar', length:100})
    calle: string;

    @Column({type: 'varchar', length:100})
    numpredio: string;

    @Column({type: 'varchar', length:100})
    colonia: string;

    @Column({type: 'varchar', length:20})
    codpostal: string;

    @Column({type: 'varchar', length:100})
    telefono: string;

    @Column({type: 'varchar', length:100})
    email: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer',  default:1})
    idciudad: number;

    @Column({type: 'integer',  default:1})
    idregimen: number;

    @Column({type: 'varchar', length:20, nullable:false})
    rfc: string;

    @Column({type: 'integer',  default:1})
    cia: number;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updateAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
