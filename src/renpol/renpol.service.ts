
import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRenpolDto, EditRenpolDto } from './dtos';

import { Renpol } from './entities';
import { Ventas } from '../ventas/entities';
import { Clientes } from '../clientes/entities';

@Injectable()
export class RenpolService {

    constructor (
        @InjectRepository(Renpol)
        private readonly renpolRepository: Repository<Renpol>,
        @InjectRepository(Ventas)
        private readonly ventasRepository: Repository<Ventas>,
        @InjectRepository(Clientes)
        private readonly clientesRepository: Repository<Clientes>
    )
    {}

    async getMany(idpoliza: number, cia: number) :Promise <any>  {
        const misrenpol =  await this.renpolRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.codigo, b.idventa')
        .addSelect ('c.codigo as codcli, c.nombre')
        .leftJoin(Ventas, 'b', 'a.idventa = b.idventa')
        .leftJoin(Clientes, 'c', 'b.idcliente = c.id')
        .where('a.idpoliza = :idpoliza', { idpoliza})
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {conse: 'ASC'})
        .getRawMany();
        return (misrenpol);
    }

    async getOne(cia:number, id: number) : Promise<any> {
        const misrenpol =  await this.renpolRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.codigo, b.id as idventa')
        .addSelect ('c.codigo as codcli, c.nombre')
        .leftJoin(Ventas, 'b', 'a.idventa = b.id')
        .leftJoin(Clientes, 'c', 'b.idcliente = c.id')
        .where('a.id = :id', { id})
        .orderBy( {conse: 'ASC'})
        .getRawOne();
        return (misrenpol);
    }

    async editOne(id: number, dto: EditRenpolDto) {
        const Polizas = await this.renpolRepository.findOneBy({id});
        if(!Polizas) throw new NotFoundException ('Rengloón de Poliza Inexistente');
        const editedPolizas = Object.assign(Polizas, dto);
        return await this.renpolRepository.update(id, editedPolizas);

    }

    async deleteOne(id: number) {
        const Polizas = await this.renpolRepository.findOneBy({id});
        if(!Polizas) throw new NotFoundException ('Rengloón de Poliza Inexistente');
        return await this.renpolRepository.delete(id);

    }

    async createOne(dto: CreateRenpolDto) {
        const nvomovcli = this.renpolRepository.create(dto);
        return await this.renpolRepository.save(nvomovcli);
    }

}
