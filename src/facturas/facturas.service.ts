import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacturasDto, EditFacturaDto } from './dtos';
import { Facturas } from './entities';
import { Renfac } from '../renfac/entities';
import { Usocfdi } from '../usdocfdi/entities';
import { Metodopago } from '../metodopago/entities';
import { Datosolicitud } from '../solicitudes/entities';
import { Clientes } from '../clientes/entities';
import { Regimenes } from '../regimenes/entities';
import { RenfacService } from '../renfac/renfac.service';
import { SolicitudesService } from '../solicitudes/solicitudes.service';
import { UsocfdiService } from '../usdocfdi/usocfdi.service';
import { MetodopagoService } from '../metodopago/metodopago.service';
import { ClientesService } from '../clientes/clientes.service';
import { RegimenesService } from '../regimenes/regimenes.service';

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
        @InjectRepository(Datosolicitud)
        private readonly datossolicitudRepository: Repository<Datosolicitud>,
        @InjectRepository(Clientes)
        private readonly clientesRepository: Repository<Clientes>,
        @InjectRepository(Regimenes)
        private readonly regimenesRepository: Repository<Regimenes>,

        private renfacService : RenfacService,
        private solicitudService: SolicitudesService,
        private usocfdiService: UsocfdiService,
        private clientesSerivce: ClientesService,
        private metodopagoService: MetodopagoService,
        private regimenesService: RegimenesService,

    )
    {}

    async getMany(cia: number) :Promise <Facturas[]>  {
        const fechaini = "";
        const fechafin = "zz"
        const query = this.facturasrepository.createQueryBuilder('a')
        .select(['a.*','b.clave as codigousocfdi',
        'b.nombre as conceptousofdi',
        'c.clave as codigometodopago',
        'c.nombre as conceptometodopago',
        'd.concepto as uuid'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
        .leftJoin(Datosolicitud, 'd', 'a.iduuid = d.id')
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
        'c.nombre as conceptometodopago',
        'd.concepto as uuid'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
        .leftJoin(Datosolicitud, 'd', 'a.iduuid = d.id')
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
        'c.nombre as conceptometodopago',
        'd.concepto as uuid'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
        .leftJoin(Datosolicitud, 'd', 'a.iduuid = d.id')
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
            const uuid = await this.solicitudService.buscaconcepto({cia:cia, concepto:mifac.uuid});
            //console.log("Ya busque uuid", uuid, mifac.uuid);
            let iduuid = -1; 
            if(iduuid) iduuid = uuid.id;
            const usocfdi = await this.usocfdiService.getOnebyCodigo(cia, mifac.cveusocfdi);
            //console.log("Ya busque usocfdi", usocfdi);
            let idusocfdi = -1;
            if(usocfdi) idusocfdi = usocfdi.id;;
            const metodopago = await this.metodopagoService.getOnebyCodigo(cia, mifac.cvemetodopago);
            //console.log("Ya busque metodopago", metodopago);
            let idmetodopago = -1;
            if(metodopago) idmetodopago = metodopago.id;;
            const rfc = mifac.rfc;
            const regimen = await this.regimenesService.getOnebyCodigo(cia, mifac.regimen);
            let idregimen = -1;
            if(regimen) idregimen = regimen.id;

            const idcli = mifac.idcli;
            let cliente = await this.clientesSerivce.getOne(cia, idcli);
            // * Solo voy a actualiza si tengo cliente, rfc y regimen
            if(cliente && (rfc != '' || idregimen != -1)) {
                const dtocliente = { rfc: rfc, idregimen: idregimen};
                const clientemodificado = await this.clientesSerivce.editOneRfc(idcli, dtocliente);
            }

            const nvafacdto = {
                serie: mifac.serie,
                numero: mifac.numero,
                idventa: mifac.idcli,
                fecha: mifac.fecha,
                iduuid: iduuid,
                idusocfdi: idusocfdi,
                idmetodopago: idmetodopago,
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
