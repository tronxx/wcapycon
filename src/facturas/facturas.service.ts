import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacturasDto, EditFacturaDto } from './dtos';
import { Facturas } from './entities';
import { Renfac } from '../renfac/entities';
import { Usocfdi } from '../usdocfdi/entities';
import { Metodopago } from '../metodopago/entities';
import { RenfacService } from '../renfac/renfac.service';

@Injectable()
export class FacturasService {

    constructor (
        @InjectRepository(Facturas)
        private readonly facturasrepository: Repository<Facturas>,
        @InjectRepository(Usocfdi)
        private readonly usocfdiRepository: Repository<Usocfdi>,
        @InjectRepository(Metodopago)
        private readonly metodopagoRepository: Repository<Metodopago>,
        @InjectRepository(Renfac)
        private readonly renfacRepository: Repository<Renfac>,
        private renfacService : RenfacService,

    )
    {}

    async getMany(cia: number) :Promise <Facturas[]>  {
        const fechaini = "";
        const fechafin = "zz"
        const query = this.facturasrepository.createQueryBuilder('a')
        .select(['a.*','b.clave as codigousocfdi',
        'b.nombre as conceptousofdi',
        'c.clave as codigometodopago',
        'c.nombre as conceptometodopago'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
        .where("a.fecha between :fechaini and :fechafin", 
            {fechaini: fechaini, fechafin: fechafin})
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {serie: 'ASC', numero:'ASC'})
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }

    async getOnebyCodigo(cia:number, numero:number, serie: string) : Promise<Facturas> {
        const query =  this.facturasrepository.createQueryBuilder('a')
        .select(['a.*','b.clave as codigousocfdi',
        'b.nombre as conceptousocfdi',
        'c.clave as codigometodopago',
        'c.nombre as conceptometodopago'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
        .where(`a.serie = '${serie}'`)
        .andWhere('a.numero =:numero', {numero})
        .andWhere('a.cia =:cia', {cia})

        const factura =  await query.getRawOne();
        if(!factura) throw new NotFoundException ('Factura Inexistente');
       return factura;
    }

    async getOne(cia:number, id: number) : Promise<Facturas> {
        const query =  this.facturasrepository.createQueryBuilder('a')
        .select(['a.*','b.clave as codigousocfdi',
        'b.nombre as conceptousocfdi',
        'c.clave as codigometodopago',
        'c.nombre as conceptometodopago'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
        .where("a.id = :id", {id: id})
        const factura =  await query.getRawOne();
        if(!factura) throw new NotFoundException ('Factura Inexistente');
       return factura;
    }

    async getLastNum(cia:number, id: number, serie: string) : Promise<any> {
        const query =  this.facturasrepository.createQueryBuilder('a')
        .select(['max(a.numero) as ultimo'])
        .where(`a.serie = '${serie}'`)
        .andWhere('a.cia =:cia', {cia})

        //.where('a.serie = :SERIE and a.cia = :CIA', {serie: serie, cia:cia})
        const factura =  await query.getRawOne();
        //if(!factura) throw new NotFoundException ('Factura Inexistente');
       return factura;
    }


    async editOne(id: number, dto: EditFacturaDto) {
        const factura = await this.facturasrepository.findOneBy({id});
        if(!factura) throw new NotFoundException ('Factura Inexistente');
        const editedfactura = Object.assign(Facturas, dto);
        return await this.facturasrepository.update(id, editedfactura);

    }

    async deleteOne(id: number) {
        const factura = await this.facturasrepository.findOneBy({id});
        if(!factura) throw new NotFoundException ('Factura Inexistente');
        return await this.facturasrepository.delete(id);

    }

    async createOne(dto: CreateFacturasDto) {
        let serie = dto.serie;
        let numero = dto.numero;
        let cia = dto.cia;
        const xfactura = await this.facturasrepository.findOneBy({serie, numero, cia});
        if(xfactura) {
            throw new NotAcceptableException ('Ya existe ese Factura');
            return;
        }

        const factura = this.facturasrepository.create(dto);
        return await this.facturasrepository.save(factura);

    }

    async importarManyFacturas(misfac: any) {
        let resultado = [];
        const cia=1;
        for(let mifac of misfac) { 
            const nvafacdto = {
                serie: mifac.serie,
                numero: mifac.numero,
                idventa: mifac.idcli,
                fecha: mifac.fecha,
                iduuid: -1,
                idusocfdi: -1,
                idmetodopago: -1,
                importe: 0,
                iva: 0,
                total: 0,
                status: 'C',
                cia: cia
            }
            let nvafac = await this.createOne(nvafacdto);
            const idfactura = nvafac.id;
            for(let renglonfac of mifac.renglones) {
                //console.log("1.- Voy a a agregar renfac", renglonfac);
                const  preciou = Math.round(renglonfac.preciou / (renglonfac.piva / 100 + 1) * 10000) / 10000;
                const miimporte = Math.round(renglonfac.importe / (renglonfac.piva / 100 + 1) * 10000) / 10000;
                const nvoiva = renglonfac.importe - miimporte;

                const nvorenfac = {
                    idfactura: idfactura,
                    idventa: mifac.idcli,
                    codigo: renglonfac.codigo,
                    descri: renglonfac.concepto,
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
            resultado.push(nvafac);
        }
        return(resultado);
    }

}
