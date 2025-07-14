import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCodigoscarteraDto, EditCosigoscarteraDto } from './dtos';

import { Codigoscartera } from './entities';

@Injectable()
export class CodigoscarteraService {

    constructor (
        @InjectRepository(Codigoscartera)
        private readonly codigoscarteraRepository: Repository<Codigoscartera>,

    )
    {}

    async getMany(cia: number) :Promise <Codigoscartera[]>  {
        const status = 'A';
        return await this.codigoscarteraRepository.find(
            {
                where: { cia, status },
                order: { codigo: 'ASC'}
            }
        );
    }


    async getOnebyCodigo(cia:number, codigo: string) : Promise<Codigoscartera> {
        const Polizas = await this.codigoscarteraRepository.findOneBy({cia, codigo});
        //if(!Polizas) throw new NotFoundException ('Codigo de Cartera Inexistente');
       return Polizas;
    }

    async getOne(cia:number, id: number) : Promise<Codigoscartera> {
        const Polizas = await this.codigoscarteraRepository.findOneBy({cia, id});
        if(!Polizas) throw new NotFoundException ('Codigo de Cartera Inexistente');
       return Polizas;
    }

    async editOne(id: number, dto: EditCosigoscarteraDto) {
        const Codigocartera = await this.codigoscarteraRepository.findOneBy({id});
        if(!Codigocartera) throw new NotFoundException ('Código de cartera Inexistente');
        const editedCodigocartera = Object.assign(Codigocartera, dto);
        return await this.codigoscarteraRepository.update(id, editedCodigocartera);

    }

    async deleteOne(id: number) {
        const Codigocartera = await this.codigoscarteraRepository.findOneBy({id});
        if(!Codigocartera) throw new NotFoundException ('Código de cartera Inexistente');
        return await this.codigoscarteraRepository.delete(id);

    }

    async createOne(dto: CreateCodigoscarteraDto) {
        const Codigocartera = this.codigoscarteraRepository.create(dto);
        return await this.codigoscarteraRepository.save(Codigocartera);
    }

}
