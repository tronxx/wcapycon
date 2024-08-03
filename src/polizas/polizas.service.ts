import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreatePolizasDto, EditPolizaDto } from './dtos';

import { Polizas } from './entities';

@Injectable()
export class PolizasService {

    constructor (
        @InjectRepository(Polizas)
        private readonly polizasRepository: Repository<Polizas>
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

    async getOne(cia:number, id: number) : Promise<Polizas> {
        const Polizas = await this.polizasRepository.findOneBy({cia, id});
        if(!Polizas) throw new NotFoundException ('Poliza Inexistente');
       return Polizas;
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
        const nvomovcli = this.polizasRepository.create(dto);
        return await this.polizasRepository.save(nvomovcli);
    }

}
