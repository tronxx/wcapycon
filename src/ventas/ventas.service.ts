import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVentasDto, EditVentaDto } from './dtos';
import { Ventas } from './entities';

@Injectable()
export class VentasService {

    constructor (
        @InjectRepository(Ventas)
        private readonly Ventaspository: Repository<Ventas>
    )
    {}

    async getMany(cia: number) :Promise <Ventas[]>  {
        return await this.Ventaspository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOnebyCodigo(cia:number, codigo: string) : Promise<Ventas> {
        const Ventas = await this.Ventaspository.findOneBy({cia, codigo});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
       return Ventas;
    }

    async getOne(cia:number, id: number) : Promise<Ventas> {
        const Ventas = await this.Ventaspository.findOneBy({cia, id});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
       return Ventas;
    }

    async editOne(id: number, dto: EditVentaDto) {
        const Ventas = await this.Ventaspository.findOneBy({id});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
        const editedVentas = Object.assign(Ventas, dto);
        return await this.Ventaspository.update(id, editedVentas);

    }

    async deleteOne(id: number) {
        const Ventas = await this.Ventaspository.findOneBy({id});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
        return await this.Ventaspository.delete(id);

    }

    async createOne(dto: CreateVentasDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xVentas = await this.Ventaspository.findOneBy({codigo, cia});
        if(xVentas) {
            throw new NotAcceptableException ('Ya existe ese Venta');
            return;
        }

        const Ventas = this.Ventaspository.create(dto);
        return await this.Ventaspository.save(Ventas);

    }

}
