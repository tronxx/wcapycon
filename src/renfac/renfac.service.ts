import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRenfacDto, EditRenfacDto } from './dtos';
import { Renfac } from './entities';

@Injectable()
export class RenfacService {

    constructor (
        @InjectRepository(Renfac)
        private readonly renfacRepository: Repository<Renfac>
    )
    {}

    async getMany(idfactura: number) :Promise <Renfac[]>  {
        return await this.renfacRepository.find(
            {
                where: { idfactura : idfactura},
                order: { conse: "ASC"}
            }
        );
    }

    async getOnebyCodigo(cia:number, serie: string, numero:number) : Promise<Renfac> {
        const renfac = await this.renfacRepository.findOneBy({cia, serie});
        if(!renfac) throw new NotFoundException ('Renglón de Factura Inexistente');
       return renfac;
    }

    async getOne(cia:number, id: number) : Promise<Renfac> {
        const renfac = await this.renfacRepository.findOneBy({cia, id});
        if(!renfac) throw new NotFoundException ('Renglón de Factura Inexistente');
       return renfac;
    }

    async editOne(id: number, dto: EditRenfacDto) {
        const renfac = await this.renfacRepository.findOneBy({id});
        if(!renfac) throw new NotFoundException ('Renglón de Factura Inexistente');
        const editedrenfac = Object.assign(Renfac, dto);
        return await this.renfacRepository.update(id, editedrenfac);

    }

    async deleteOne(id: number) {
        const renfac = await this.renfacRepository.findOneBy({id});
        if(!renfac) throw new NotFoundException ('Renglón de Factura Inexistente');
        return await this.renfacRepository.delete(id);

    }

    async createOne(dto: CreateRenfacDto) {
        const renfac = this.renfacRepository.create(dto);
        return await this.renfacRepository.save(renfac);

    }

}
