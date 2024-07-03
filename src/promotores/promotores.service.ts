import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotorDto, EditPromotorDto } from './dtos';
import { Promotor } from './entities';

@Injectable()
export class PromotoresService {

    constructor (
        @InjectRepository(Promotor)
        private readonly promotoresRepository: Repository<Promotor>
    )
    {}

    async getMany(cia: number) :Promise <Promotor[]>  {
        return await this.promotoresRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Promotor> {
        const Promotor = await this.promotoresRepository.findOneBy({cia, id});
        if(!Promotor) throw new NotFoundException ('Promotor Inexistente');
       return Promotor;
    }

    async editOne(id: number, dto: EditPromotorDto) {
        const Promotor = await this.promotoresRepository.findOneBy({id});
        if(!Promotor) throw new NotFoundException ('Promotor Inexistente');
        const editedPromotor = Object.assign(Promotor, dto);
        return await this.promotoresRepository.update(id, editedPromotor);

    }

    async deleteOne(id: number) {
        const Promotor = await this.promotoresRepository.findOneBy({id});
        if(!Promotor) throw new NotFoundException ('Promotor Inexistente');
        return await this.promotoresRepository.delete(id);

    }

    async createOne(dto: CreatePromotorDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xPromotor = await this.promotoresRepository.findOneBy({codigo, cia});
        if(xPromotor) {
            throw new NotAcceptableException ('Ya existe ese Promotor');
            return;
        }

        const Promotor = this.promotoresRepository.create(dto);
        return await this.promotoresRepository.save(Promotor);

    }

}
