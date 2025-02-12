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

@Entity('codigosusuario')
@Unique(['idusuario', 'idcodigo'])
export class Codigosusuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'integer'})
    idusuario: number;

    @Column({type: 'integer'})
    idcodigo: number;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date
  
}
