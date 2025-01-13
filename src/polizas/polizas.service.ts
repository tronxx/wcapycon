import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreatePolizasDto, EditPolizaDto } from './dtos';

import { Polizas } from './entities';
import { Codigoscaja } from '../codigoscaja/entities';

@Injectable()
export class PolizasService {

    constructor (
        @InjectRepository(Polizas)
        private readonly polizasRepository: Repository<Polizas>,
        @InjectRepository(Codigoscaja)
        private readonly almacenesRepository: Repository<Codigoscaja>

    )
    {}

    async getMany(idtienda: number) :Promise <Polizas[]>  {
        return await this.polizasRepository.find(
            {
                where: { idtienda },
                order: { fecha: 'ASC'}
            }
        );
    }

    async getManyByFecha(cia: number, idtienda: number, fechaini: string, fechafin: string ) :Promise <any[]>  {
        const mispolizas =  await this.polizasRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.nombre as nombretda')
        .leftJoin(Codigoscaja, 'b', 'a.idtienda = b.id')
        .where('a.fecha BETWEEN :startDate AND :endDate', {
          startDate: fechaini,
          endDate: fechafin,
        })
        .andWhere('a.idtienda =:idtienda', {idtienda})
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {fecha: 'ASC'})
        .getRawMany();
        return (mispolizas);
    }

    async getOne(cia:number, id: number) : Promise<any> {
            const mispolizas =  await this.polizasRepository
            .createQueryBuilder('a')
            .select('a.*')
            .addSelect ('b.nombre as nombretda')
            .leftJoin(Codigoscaja, 'b', 'a.idtienda = b.id')
            .where('a.id = :id', {id})
            .andWhere('a.cia =:cia', {cia})
            .getRawOne();
            return (mispolizas);
   
    }

    async editOne(id: number, dto: EditPolizaDto) {
        const Polizas = await this.polizasRepository.findOneBy({id});
        if(!Polizas) throw new NotFoundException ('Poliza Inexistente');
        const editedPolizas = Object.assign(Polizas, dto);
        return await this.polizasRepository.update(id, editedPolizas);

    }

    async deleteOne(id: number) {
        const Polizas = await this.polizasRepository.findOneBy({id});
        if(!Polizas) throw new NotFoundException ('Poliza Inexistente');
        return await this.polizasRepository.delete(id);

    }

    async createOne(dto: CreatePolizasDto) {
        const fecha = dto.fecha;
        const tda = dto.tda
        const poliza = await this.polizasRepository.findOneBy({fecha, tda});
        if(poliza) return poliza;
        const nvapoliza = this.polizasRepository.create(dto);
        return await this.polizasRepository.save(nvapoliza);
    }

}
