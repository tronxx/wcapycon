import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVentasDto, EditVentaDto } from './dtos';
import { Ventas, Ubivtas } from './entities';
import { Clientes } from '../clientes/entities'
import { Facturas } from '../facturas/entities'
import { Renfac } from '../renfac/entities';
import { FacturasService } from '../facturas/facturas.service';
import { RenfacService } from '../renfac/renfac.service';

@Injectable()
export class VentasService {

    constructor (
        @InjectRepository(Ventas)
        private readonly ventasRepository: Repository<Ventas>,
        @InjectRepository(Clientes)
        private readonly clientesRepository: Repository<Clientes>,
        @InjectRepository(Facturas)
        private readonly facturasRepository: Repository<Facturas>,
        @InjectRepository(Renfac)
        private readonly renfacRepository: Repository<Renfac>,
        @InjectRepository(Ubivtas)
        private readonly ubivtasRepository: Repository<Ubivtas>,
        private renfacService : RenfacService,
        private facturasService: FacturasService
    )
    {}

    async getMany(cia: number, fechainicial:string, fechafinal:string, ubica:string) :Promise <Ventas[]>  {
        const misventas =  await this.ventasRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.nombre, d.numero as numfac, d.serie as seriefac, c.codigo as ubica ')
        .leftJoin(Clientes, 'b', 'a.idcliente = b.id')
        .leftJoin(Facturas, 'd', 'a.id = d.idventa')
        .leftJoin(Ubivtas, 'c', 'a.idubica = c.id')
        .where('a.fecha BETWEEN :startDate AND :endDate', {
          startDate: fechainicial,
          endDate: fechafinal,
        })
        .andWhere(`c.codigo ='${ubica}'`)
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
        dto.fechasaldo=dto.fecha;

        const Ventas = this.ventasRepository.create(dto);
        return await this.ventasRepository.save(Ventas);

    }

    async createVenta(data: any) {
        // data está compuesto por
        // data {
        // venta
        // factura
        // renfac
        //}
        try {
            let nvaventa = await this.createOne(data.venta);
            const cia = data.venta.cia;
            const idventa = nvaventa.id;
            data.factura.idventa = idventa;
            const factura = await this.facturasService.createOne(data.factura);
            const idfactura = factura.id;
            data.venta.idfactura = idfactura;
            nvaventa.idfactura = idfactura;
            console.log("Renglones de Factura", data.renfac);

            for(let renglonfac of data.renfac) {
                console.log("Voya a agregar renfac", renglonfac);
                const  preciou = Math.round(renglonfac.preciou / (renglonfac.piva / 100 + 1) * 10000) / 10000;
                const miimporte = Math.round(renglonfac.importe / (renglonfac.piva / 100 + 1) * 10000) / 10000;
                const nvoiva = renglonfac.importe - miimporte;

                const nvorenfac = {
                    idfactura: idfactura,
                    idventa: idventa,
                    codigo: renglonfac.codigo,
                    descri: renglonfac.descri,
                    serie: renglonfac.serie,
                    preciou: preciou,
                    canti: renglonfac.canti,
                    piva: renglonfac.piva,
                    importe: miimporte,
                    iva: nvoiva,
                    folio: renglonfac.folio,
                    status: 'A',
                    conse: 0,
                    cia: cia
                            
                }
                const renfac = this.renfacService.createOne(nvorenfac);
            }
            const ventamod = {
                idfactura: idfactura
            }
            const nvaventamodif  = await this.editOne(idventa, ventamod);
            return (nvaventa);

        } catch  (err) {
            return ({status: 'ERROR', message:'Ha ocurrido un error', error: err});

        }
    
    }

}
