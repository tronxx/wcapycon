import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetodopagoDto, EditMetodopagoDto } from './dtos';
import { Metodopago } from './entities';

@Injectable()
export class MetodopagoService {

    constructor (
        @InjectRepository(Metodopago)
        private readonly MetodopagoRepository: Repository<Metodopago>
    )
    {}

    async getMany(cia: number) :Promise <Metodopago[]>  {
        return await this.MetodopagoRepository.find(
            {
                where: { cia : cia},
                order: { clave: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Metodopago> {
        const metodopago = await this.MetodopagoRepository.findOneBy({cia, id});
        if(!metodopago) throw new NotFoundException ('Método de Pago Inexistente');
       return metodopago;
    }

    async editOne(id: number, dto: EditMetodopagoDto) {
        const metodopago = await this.MetodopagoRepository.findOneBy({id});
        if(!metodopago) throw new NotFoundException ('Método de Pago Inexistente');
        const editedmetodopago = Object.assign(Metodopago, dto);
        return await this.MetodopagoRepository.update(id, editedmetodopago);

    }

    async deleteOne(id: number) {
        const metodopago = await this.MetodopagoRepository.findOneBy({id});
        if(!metodopago) throw new NotFoundException ('Método de Pago Inexistente');
        return await this.MetodopagoRepository.delete(id);

    }

    async createOne(dto: CreateMetodopagoDto) {
        let clave = dto.clave;
        let cia = dto.cia;
        const xMetodopago = await this.MetodopagoRepository.findOneBy({clave, cia});
        if(xMetodopago) {
            throw new NotAcceptableException ('Ya existe ese Método de Pago');
            return;
        }

        const metodopago = this.MetodopagoRepository.create(dto);
        return await this.MetodopagoRepository.save(metodopago);

    }

}
