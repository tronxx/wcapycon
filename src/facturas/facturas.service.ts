import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacturasDto, EditFacturaDto } from './dtos';
import { Facturas } from './entities';

@Injectable()
export class FacturasService {

    constructor (
        @InjectRepository(Facturas)
        private readonly facturaspository: Repository<Facturas>
    )
    {}

    async getMany(cia: number) :Promise <Facturas[]>  {
        return await this.facturaspository.find(
            {
                where: { cia : cia},
                order: { serie: "ASC", numero: "ASC"}
            }
        );
    }

    async getOnebyCodigo(cia:number, serie: string, numero:number) : Promise<Facturas> {
        const factura = await this.facturaspository.findOneBy({cia, serie, numero});
        if(!factura) throw new NotFoundException ('Factura Inexistente');
       return factura;
    }

    async getOne(cia:number, id: number) : Promise<Facturas> {
        const factura = await this.facturaspository.findOneBy({cia, id});
        if(!factura) throw new NotFoundException ('Factura Inexistente');
       return factura;
    }

    async editOne(id: number, dto: EditFacturaDto) {
        const factura = await this.facturaspository.findOneBy({id});
        if(!factura) throw new NotFoundException ('Factura Inexistente');
        const editedfactura = Object.assign(Facturas, dto);
        return await this.facturaspository.update(id, editedfactura);

    }

    async deleteOne(id: number) {
        const factura = await this.facturaspository.findOneBy({id});
        if(!factura) throw new NotFoundException ('Factura Inexistente');
        return await this.facturaspository.delete(id);

    }

    async createOne(dto: CreateFacturasDto) {
        let serie = dto.serie;
        let numero = dto.numero;
        let cia = dto.cia;
        const xfactura = await this.facturaspository.findOneBy({serie, numero, cia});
        if(xfactura) {
            throw new NotAcceptableException ('Ya existe ese Factura');
            return;
        }

        const factura = this.facturaspository.create(dto);
        return await this.facturaspository.save(factura);

    }

}
