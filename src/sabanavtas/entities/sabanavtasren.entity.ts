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

@Entity('sabanavtasren')
export class Sabanvtasren {
    @PrimaryColumn({ type: 'int'})  
    id: number;

    @Column({type: 'integer'})
    idsabana: number;

    @Column({type: 'integer'})
    idventa: number;

    @Column({type: 'varchar', length:10, nullable: false})
    codigo: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date

}
