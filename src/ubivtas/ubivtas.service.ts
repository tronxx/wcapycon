
import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreateUbivtasDto, EditUbivtaDto } from './dtos';
import { Ubivtas } from './entities';

@Injectable()
export class UbivtasService {

    constructor (
        @InjectRepository(Ubivtas)
        private readonly ubivtasRepository: Repository<Ubivtas>
    )
    {}

    async getMany(cia: number) :Promise <Ubivtas[]>  {
        return await this.ubivtasRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Ubivtas> {
        const ubivta = await this.ubivtasRepository.findOneBy({cia, id});
        if(!ubivta) throw new NotFoundException ('ubicación Inexistente');
       return ubivta;
    }

    async editOne(id: number, dto: EditUbivtaDto) {
        const ubivta = await this.ubivtasRepository.findOneBy({id});
        if(!ubivta) throw new NotFoundException ('ubicación Inexistente');
        const editedubivta = Object.assign(ubivta, dto);
        return await this.ubivtasRepository.update(id, editedubivta);

    }

    async deleteOne(id: number) {
        const ubivta = await this.ubivtasRepository.findOneBy({id});
        if(!ubivta) throw new NotFoundException ('ubicación Inexistente');
        return await this.ubivtasRepository.delete(id);

    }

    async createOne(dto: CreateUbivtasDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xubivta = await this.ubivtasRepository.findOneBy({codigo, cia});
        if(xubivta) {
            throw new NotAcceptableException ('Ya existe esa Ubicación');
            return;
        }

        const ubivta = this.ubivtasRepository.create(dto);
        return await this.ubivtasRepository.save(ubivta);

    }

}
