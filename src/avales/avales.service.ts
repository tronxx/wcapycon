import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreateAvalDto, EditAvalDto,  } from './dtos';
import { Aval } from './entities';

@Injectable()
export class AvalesService {

    constructor (
        @InjectRepository(Aval)
        private readonly avalesRepository: Repository<Aval>
    )
    {}

    async getMany(cia: number) :Promise <Aval[]>  {
        return await this.avalesRepository.findBy(
            {
                 cia
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Aval> {
        const Aval = await this.avalesRepository.findOneBy({ id});
        if(!Aval) throw new NotFoundException ('Aval Inexistente');
       return Aval;
    }

    async editOne(id: number, dto: EditAvalDto) {
        const Aval = await this.avalesRepository.findOneBy({id});
        if(!Aval) throw new NotFoundException ('Aval Inexistente');
        const editedAval = Object.assign(Aval, dto);
        return await this.avalesRepository.update(id, editedAval);

    }

    async deleteOne(id: number) {
        const Aval = await this.avalesRepository.findOneBy({id});
        if(!Aval) throw new NotFoundException ('Aval Inexistente');
        return await this.avalesRepository.delete(id);

    }

    async createOne(dto: CreateAvalDto) {
        const Aval = this.avalesRepository.create(dto);
        return await this.avalesRepository.save(Aval);

    }

}
