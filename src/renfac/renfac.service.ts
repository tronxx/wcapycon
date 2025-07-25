import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRenfacDto, EditRenfacDto } from './dtos';
import { Renfac } from './entities';

@Injectable()
export class RenfacService {

    constructor (
        @InjectRepository(Renfac)
        private readonly renfacRepository: Repository<Renfac>
    )
    {}

    async getMany(idfactura: number) :Promise <Renfac[]>  {
        return await this.renfacRepository.find(
            {
                where: { idfactura : idfactura},
                order: { conse: "ASC"}
            }
        );
    }

    async getOnebyCodigo(cia:number, serie: string, numero:number) : Promise<Renfac> {
        const renfac = await this.renfacRepository.findOneBy({cia, serie});
        if(!renfac) throw new NotFoundException ('Renglón de Factura Inexistente');
       return renfac;
    }

    async getOne(cia:number, id: number) : Promise<Renfac> {
        const renfac = await this.renfacRepository.findOneBy({cia, id});
        if(!renfac) throw new NotFoundException ('Renglón de Factura Inexistente');
       return renfac;
    }

    async getCompraByIdVenta(idventa: number) {
        const renglones =  await this.renfacRepository.find(
            {
                where: { idventa : idventa},
                order: { conse: "ASC"}
            }
        );
        let compra = "";
        for(let mirenfac of renglones) {
            compra += mirenfac.descri;
            if(mirenfac.folio) compra += " # " + mirenfac.folio.toString();
            if(mirenfac.serie) compra += " S/" + mirenfac.serie;
            compra += " ";
        }
        return ({compra: compra});
    }

    async getCompra(idfactura: number) : Promise<any> {
        const renglones =  await this.renfacRepository.find(
            {
                where: { idfactura : idfactura},
                order: { conse: "ASC"}
            }
        );
        let compra = "";
        for(let mirenfac of renglones) {
            compra += mirenfac.descri;
            if(mirenfac.folio) compra += " # " + mirenfac.folio.toString();
            if(mirenfac.serie) compra += " S/" + mirenfac.serie;
            compra += " ";
        }
        return ({compra: compra});
    }

    async editOne(id: number, dto: EditRenfacDto) {
        const renfac = await this.renfacRepository.findOneBy({id});
        if(!renfac) throw new NotFoundException ('Renglón de Factura Inexistente');
        const editedrenfac = Object.assign(Renfac, dto);
        return await this.renfacRepository.update(id, editedrenfac);

    }

    async deleteOne(id: number) {
        const renfac = await this.renfacRepository.findOneBy({id});
        if(!renfac) throw new NotFoundException ('Renglón de Factura Inexistente');
        return await this.renfacRepository.delete(id);

    }

    async createOne(dto: CreateRenfacDto) {
        const signosparam = '?,'.repeat(12) + '?';
        // console.log("Voy a agregar renfac", dto, "Signos param:", signosparam);
        const agregarenfac = await this.renfacRepository
        .query( `CALL add_renfac(${signosparam})`,
          [ 
            dto.idfactura,
            dto.idventa,
            dto.codigo,
            dto.descri,
            dto.serie,
            dto.preciou,
            dto.canti,
            dto.piva,
            dto.importe,
            dto.iva,
            dto.folio,
            dto.status,
            dto.cia
          ]
        );
        return (agregarenfac);

    }

}
