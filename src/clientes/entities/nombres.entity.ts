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

@Entity('nombres')
export class Nombres {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100})
    appat: string;

    @Column({type: 'varchar', length:100})
    apmat: string;

    @Column({type: 'varchar', length:100})
    nompil1: string;

    @Column({type: 'varchar', length:100})
    nompil2: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updateAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
  
}
