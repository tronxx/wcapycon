import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreateRegimenesDto, EditRegimenesDto } from './dtos';
import { Regimenes } from './entities';

@Injectable()
export class RegimenesService {

    constructor (
        @InjectRepository(Regimenes)
        private readonly RegimenesRepository: Repository<Regimenes>
    )
    {}

    async getMany(cia: number) :Promise <Regimenes[]>  {
        return await this.RegimenesRepository.find(
            {
                where: { cia : cia},
                order: { clave: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Regimenes> {
       const Regimenes = await this.RegimenesRepository.findOneBy({cia, id});
       if(!Regimenes) throw new NotFoundException ('Régimen Inexistente');
       return Regimenes;
    }

    async getOnebyCodigo(cia:number, clave: string) : Promise<Regimenes> {
       const Regimenes = await this.RegimenesRepository.findOneBy({cia, clave});
       return Regimenes;
    }

    async editOne(id: number, dto: EditRegimenesDto) {
        const Regimenes = await this.RegimenesRepository.findOneBy({id});
        if(!Regimenes) throw new NotFoundException ('Régimen Inexistente');
        const editedRegimenes = Object.assign(Regimenes, dto);
        return await this.RegimenesRepository.update(id, editedRegimenes);

    }

    async deleteOne(id: number) {
        const Regimenes = await this.RegimenesRepository.findOneBy({id});
        if(!Regimenes) throw new NotFoundException ('Régimen Inexistente');
        return await this.RegimenesRepository.delete(id);

    }

    async createOne(dto: CreateRegimenesDto) {
        let clave = dto.clave;
        let cia = dto.cia;
        const xRegimenes = await this.RegimenesRepository.findOneBy({clave, cia});
        if(xRegimenes) {
            throw new NotAcceptableException ('Ya existe ese Régimen');
            return;
        }

        const Regimenes = this.RegimenesRepository.create(dto);
        return await this.RegimenesRepository.save(Regimenes);

    }

}
