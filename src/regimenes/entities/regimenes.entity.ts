import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    PrimaryColumn
  } from 'typeorm';

@Entity('regimenes')

export class Regimenes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:30, nullable: false})
    clave: string;

    @Column({type: 'varchar', length:100, nullable: false})
    nombre: string;

    @Column({type: 'integer'})
    cia: number;

    @Column({type: 'varchar', length:1})
    status: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
