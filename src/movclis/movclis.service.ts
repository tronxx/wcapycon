import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovclisDto, EditMovcliDto } from './dtos';
import { Movclis } from './entities';

@Injectable()
export class MovclisService {

    constructor (
        @InjectRepository(Movclis)
        private readonly movclisRepository: Repository<Movclis>
    )
    {}

    async getMany(idventa: number) :Promise <Movclis[]>  {
        return await this.movclisRepository.find(
            {
                where: { idventa},
                order: { fecha: 'ASC', consecutivo: 'ASC'}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Movclis> {
        const Movclis = await this.movclisRepository.findOneBy({cia, id});
        if(!Movclis) throw new NotFoundException ('Movimiento Inexistente');
       return Movclis;
    }

    async editOne(id: number, dto: EditMovcliDto) {
        const Movclis = await this.movclisRepository.findOneBy({id});
        if(!Movclis) throw new NotFoundException ('Movimiento Inexistente');
        const editedMovclis = Object.assign(Movclis, dto);
        return await this.movclisRepository.update(id, editedMovclis);

    }

    async deleteOne(id: number) {
        const Movclis = await this.movclisRepository.findOneBy({id});
        if(!Movclis) throw new NotFoundException ('Movimiento Inexistente');
        return await this.movclisRepository.delete(id);

    }

    async xxcreateOne(dto: CreateMovclisDto) {
        const nvomovcli = this.movclisRepository.create(dto);
        return await this.movclisRepository.save(nvomovcli);
    }

    async createOne(dto: CreateMovclisDto) {
        const signosparam = '?,'.repeat(15) + '?';
        
        const agregamov = await this.movclisRepository
        .query( `CALL add_movcli(${signosparam})`,
          [ 
            dto.idventa,
            dto.fecha,
            dto.coa,
            dto.idconcepto,
            dto.idpoliza,
            dto.consecutivo,
            dto.tipopago,
            dto.recobon,
            dto.importe,
            dto.cobratario,
            dto.usuario,
            dto.status,
            dto.idcobratario,
            dto.idusuario,
            dto.cia,
            dto.concepto
          ]
        );
        return (agregamov)
    }

}
