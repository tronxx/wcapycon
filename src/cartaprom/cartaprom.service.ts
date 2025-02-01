import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartapromDto, EditCartapromDto } from './dtos';
import { Cartaprom } from './entities';

@Injectable()
export class CartapromService {

    constructor (
        @InjectRepository(Cartaprom)
        private readonly cartapromRepository: Repository<Cartaprom>
    )
    {}

    async getMany(cia: number) :Promise <Cartaprom[]>  {
        return await this.cartapromRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Cartaprom> {
        const cartaprom = await this.cartapromRepository.findOneBy({cia, id});
        if(!cartaprom) throw new NotFoundException ('Carta Promoción Inexistente');
       return cartaprom;
    }

    async getOnebyCodigo(cia:number, codigo: string) : Promise<Cartaprom> {
        const cartaprom = await this.cartapromRepository.findOneBy({cia, codigo});
       return cartaprom;
    }

    async editOne(id: number, dto: EditCartapromDto) {
        const cartaprom = await this.cartapromRepository.findOneBy({id});
        if(!cartaprom) throw new NotFoundException ('Carta Promoción Inexistente');
        const editedCartaprom = Object.assign(cartaprom, dto);
        return await this.cartapromRepository.update(id, editedCartaprom);

    }

    async deleteOne(id: number) {
        const cartaprom = await this.cartapromRepository.findOneBy({id});
        if(!cartaprom) throw new NotFoundException ('Carta Promoción Inexistente');
        return await this.cartapromRepository.delete(id);

    }

    async createOne(dto: CreateCartapromDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xVendedor = await this.cartapromRepository.findOneBy({codigo, cia});
        if(xVendedor) {
            throw new NotAcceptableException ('Ya existe esa Carta Promoción');
            return;
        }

        const Vendedor = this.cartapromRepository.create(dto);
        return await this.cartapromRepository.save(Vendedor);

    }


}
