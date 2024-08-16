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

@Entity('ubivtas')
@Unique(['codigo', 'cia'])
export class Ubivtas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:4, nullable: false})
    codigo: string;

    @Column({type: 'varchar', length:50, nullable: false})
    nombre: string;


    @Column({type: 'varchar', length:3})
    zona: string;

    @Column({type: 'varchar', length:1})
    status: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date

}
