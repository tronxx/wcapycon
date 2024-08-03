
import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRenpolDto, EditRenpolDto } from './dtos';

import { Renpol } from './entities';

@Injectable()
export class RenpolService {

    constructor (
        @InjectRepository(Renpol)
        private readonly renpolRepository: Repository<Renpol>
    )
    {}

    async getMany(idpoliza: number) :Promise <Renpol[]>  {
        return await this.renpolRepository.find(
            {
                where: { idpoliza },
                order: { conse: 'ASC'}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Renpol> {
        const Polizas = await this.renpolRepository.findOneBy({cia, id});
        if(!Polizas) throw new NotFoundException ('Rengloón de Poliza Inexistente');
       return Polizas;
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
