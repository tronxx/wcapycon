import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVentasDto, EditVentaDto } from './dtos';
import { Ventas, Ubivtas } from './entities';
import { Clientes } from '../clientes/entities'
import { Facturas } from '../facturas/entities'

@Injectable()
export class VentasService {

    constructor (
        @InjectRepository(Ventas)
        private readonly ventasRepository: Repository<Ventas>,
        @InjectRepository(Clientes)
        private readonly clientesRepository: Repository<Clientes>,
        @InjectRepository(Facturas)
        private readonly facturasRepository: Repository<Facturas>,
        @InjectRepository(Ubivtas)
        private readonly ubivtasRepository: Repository<Ubivtas>,
    )
    {}

    async getMany(cia: number, fechainicial:string, fechafinal:string, ubica:string) :Promise <Ventas[]>  {
        const misventas =  await this.ventasRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.nombre, d.numero, d.serie, c.codigo')
        .leftJoin(Clientes, 'b', 'a.idcliente = b.id')
        .leftJoin(Facturas, 'd', 'a.idfactura = d.id')
        .leftJoin(Ubivtas, 'c', 'a.idubica = c.id')
        .where('a.fecha BETWEEN :startDate AND :endDate', {
          startDate: fechainicial,
          endDate: fechafinal,
        })
        .andWhere('c.codigo =:ubica', {ubica})
        .andWhere('a.cia =:cia', {cia})
        .getRawMany();
        return (misventas);
    }

    async getOnebyCodigo(cia:number, codigo: string) : Promise<Ventas> {
        const Ventas = await this.ventasRepository.findOneBy({cia, codigo});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
       return Ventas;
    }

    async getOne(cia:number, id: number) : Promise<Ventas> {
        const Ventas = await this.ventasRepository.findOneBy({cia, id});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
       return Ventas;
    }

    async editOne(id: number, dto: EditVentaDto) {
        const Ventas = await this.ventasRepository.findOneBy({id});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
        const editedVentas = Object.assign(Ventas, dto);
        return await this.ventasRepository.update(id, editedVentas);

    }

    async deleteOne(id: number) {
        const Ventas = await this.ventasRepository.findOneBy({id});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
        return await this.ventasRepository.delete(id);

    }

    async createOne(dto: CreateVentasDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xVentas = await this.ventasRepository.findOneBy({codigo, cia});
        if(xVentas) {
            throw new NotAcceptableException ('Ya existe ese Venta');
            return;
        }

        const Ventas = this.ventasRepository.create(dto);
        return await this.ventasRepository.save(Ventas);

    }

}
