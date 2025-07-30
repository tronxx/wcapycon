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

@Entity('sabanavtas')
@Unique(['ubica', 'folio', 'cia'])
export class Sabanavtas {
    @PrimaryColumn({ type: 'int'})  
    id: number;

    @Column({type: 'varchar', length:10, nullable: false})
    ubica: string;

    @Column({type: 'integer'})
    folio: number;

    @Column({type: 'date', nullable:false})
    @Transform(({ value }) => value.toISOString().split('T')[0], { toClassOnly: true })
    fecha: string;

    @Column({type: 'date', nullable:false})
    @Transform(({ value }) => value.toISOString().split('T')[0], { toClassOnly: true })
    fechaini: string;

    @Column({type: 'date', nullable:false})
    @Transform(({ value }) => value.toISOString().split('T')[0], { toClassOnly: true })
    fechafin: string;

    @Column({type: 'integer'})
    cia: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: 'timestamp'})
    updatedAt: Date

}
