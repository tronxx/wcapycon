import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCodigoscajaDto, EditCosigoscajaDto } from './dtos';

import { Codigoscaja, Codigosusuario } from './entities';

@Injectable()
export class CodigoscajaService {

    constructor (
        @InjectRepository(Codigoscaja)
        private readonly codigoscajaRepository: Repository<Codigoscaja>,

    )
    {}

    async getMany(cia: number) :Promise <Codigoscaja[]>  {
        const status = 'A';
        return await this.codigoscajaRepository.find(
            {
                where: { cia, status: status },
                order: { tda: 'ASC'}
            }
        );
    }

    async getCodigosCajaUsuario(cia: number, idusuario: number) :Promise <Codigoscaja[]>  {
            const miventa =  await this.codigoscajaRepository
            .createQueryBuilder('a')
            .select('a.*')
            .leftJoin(Codigosusuario, 'b', 'a.id = b.idcodigo')
            .where('b.idusuario = :idusuario',  {idusuario})
            .andWhere('a.cia =:cia', {cia})
            .getRawMany();
            return (miventa);
    }


    async getOne(cia:number, id: number) : Promise<Codigoscaja> {
        const Polizas = await this.codigoscajaRepository.findOneBy({cia, id});
        if(!Polizas) throw new NotFoundException ('Codigo de Caja Inexistente');
       return Polizas;
    }

    async editOne(id: number, dto: EditCosigoscajaDto) {
        const Polizas = await this.codigoscajaRepository.findOneBy({id});
        if(!Polizas) throw new NotFoundException ('Código de caja Inexistente');
        const editedPolizas = Object.assign(Polizas, dto);
        return await this.codigoscajaRepository.update(id, editedPolizas);

    }

    async deleteOne(id: number) {
        const Polizas = await this.codigoscajaRepository.findOneBy({id});
        if(!Polizas) throw new NotFoundException ('Código de caja Inexistente');
        return await this.codigoscajaRepository.delete(id);

    }

    async createOne(dto: CreateCodigoscajaDto) {
        const nvomovcli = this.codigoscajaRepository.create(dto);
        return await this.codigoscajaRepository.save(nvomovcli);
    }


}
