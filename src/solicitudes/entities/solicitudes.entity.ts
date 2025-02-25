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

@Entity('solicitudes')
@Unique(['idcliente', 'iddato'])
export class Solicitudes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idcliente: number;

    @Column({type: 'integer'})
    tipo: number;

    @Column({type: 'integer'})
    iddato: number;

    @Column({type: 'integer'})
    iddatosolicitud: number;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}
