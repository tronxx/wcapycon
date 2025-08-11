import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVentasDto, EditVentaDto } from './dtos';
import { Ventas, Ubivtas } from './entities';
import { Clientes, Nombres } from '../clientes/entities'
import { Facturas } from '../facturas/entities';
import { Renfac } from '../renfac/entities';
import { Promotor } from '../promotores/entities';
import { Ciudades } from '../ciudades/entities';
import { PromotoresService } from '../promotores/promotores.service';
import { FacturasService } from '../facturas/facturas.service';
import { RenfacService } from '../renfac/renfac.service';
import { ClientesService } from '../clientes/clientes.service';
import { UbivtasService } from '../ubivtas/ubivtas.service';
import { VendedoresService } from '../vendedores/vendedores.service';
import { Vendedor } from '../vendedores/entities';
import { Solicitudes } from '../solicitudes/entities';
import { CartapromService } from '../cartaprom/cartaprom.service';
import { CiudadesService } from '../ciudades/ciudades.service';
import { privateDecrypt } from 'crypto';

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
        @InjectRepository(Promotor)
        private readonly promotoresRepository: Repository<Promotor>,
        @InjectRepository(Vendedor)
        private readonly vendedoresRepository: Repository<Vendedor>,
        @InjectRepository(Solicitudes)
        private readonly solicitudesRepository: Repository<Solicitudes>,
        @InjectRepository(Ciudades)
        private readonly ciudadesRepository: Repository<Ciudades>,
        
        private renfacService : RenfacService,
        private facturasService: FacturasService,
        private clientesService: ClientesService,
        private promotoresService: PromotoresService,
        private ubivtasService: UbivtasService,
        private vendedoresService : VendedoresService,
        private cartapromService: CartapromService,
        private ciudadesService: CiudadesService,
    )
    {}

    async getMany(cia: number, fechainicial:string, fechafinal:string, ubica:string) :Promise <Ventas[]>  {
        const misventas =  await this.ventasRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.nombre, d.numero as numfac, d.serie as seriefac, c.codigo as ubica ')
        .leftJoin(Clientes, 'b', 'a.idcliente = b.id')
        .leftJoin(Facturas, 'd', 'a.idventa = d.idventa')
        .leftJoin(Ubivtas, 'c', 'a.idubica = c.id')
        .where('a.fecha BETWEEN :startDate AND :endDate', {
          startDate: fechainicial,
          endDate: fechafinal,
        })
        .andWhere('c.codigo =:ubica', {ubica:`${ubica}`})
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {codigo: 'ASC'})
        .limit(1000) // Limita los resultados a 1000 registros
        .getRawMany();
        return (misventas);
    }

    async getManybyNombre(cia: number, nombre:string) :Promise <Ventas[]>  {
        const misventas =  await this.ventasRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.nombre, d.numero as numfac, d.serie as seriefac, c.codigo as ubica ')
        .leftJoin(Clientes, 'b', 'a.idcliente = b.id')
        .leftJoin(Facturas, 'd', 'a.idventa = d.idventa')
        .leftJoin(Ubivtas, 'c', 'a.idubica = c.id')
        .where('a.cargos > a.abonos')
        .andWhere('a.cia =:cia', {cia})
        .andWhere(`b.nombre like :nombre`, { nombre: `%${nombre}%` })
        .orderBy( {nombre: 'ASC'})
        .getRawMany();
        return (misventas);
    }

    async getManybyIdCli(cia: number, idcli: number) :Promise <Ventas[]>  {
        //console.log("Buscando Ventas por idcliente", idcli);
        const misventas =  await this.ventasRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.nombre, d.numero as numfac, d.serie as seriefac, c.codigo as ubica ')
        .leftJoin(Clientes, 'b', 'a.idcliente = b.id')
        .leftJoin(Facturas, 'd', 'a.idventa = d.idventa')
        .leftJoin(Ubivtas, 'c', 'a.idubica = c.id')
        .where('a.idcliente = :idcli', {idcli})
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {fecha: 'ASC'})
        .getRawMany();
        return (misventas);
    }

    async getOnebyCodigo(cia:number, codigo: string) : Promise<Ventas> {
        const Ventas = await this.ventasRepository.findOneBy({codigo, cia});
        let idventa = -1;
        if(Ventas) idventa = Ventas.idventa;
        return this.getOne(cia, idventa);
    }    

    async getSigteAnterbyCodigo(cia: number, codigo: string, haciadonde: string): Promise<Ventas> {
        let wheresql = '';
        let micod = '';
        if(haciadonde === 'anterior') {
            micod = 'max (codigo) as codigo';
            wheresql = ' codigo < :codigo';
        } else if (haciadonde === 'siguiente') {
            micod  = 'min (codigo) as codigo';
            wheresql = ' codigo > :codigo';
        }
        
        const micodigo = await this.ventasRepository
            .createQueryBuilder('a')
            .select(micod)
            .where(wheresql, { codigo })
            .andWhere('a.cia =:cia', {cia})
            .getRawOne();
            
        if (!micodigo) {
            throw new Error('No se encontró el registro');
        }
        
        const cod = micodigo.codigo;
        return this.getOnebyCodigo(cia, cod);
    }    


    async getOne(cia:number, id: number) : Promise<Ventas> {
        const miventa =  await this.ventasRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.nombre, d.numero as numfac, d.serie as seriefac, c.codigo as ubica ')
        .leftJoin(Clientes, 'b', 'a.idcliente = b.id')
        .leftJoin(Facturas, 'd', 'a.idventa = d.idventa')
        .leftJoin(Ubivtas, 'c', 'a.idubica = c.id')
        .where('a.idventa = :id',  {id})
        .andWhere('a.cia =:cia', {cia})
        .getRawOne();
        return (miventa);
    }

    async editOne(idventa: number, dto: EditVentaDto) {
        if (dto.fecha)  dto.fecha = dto.fecha.split('T')[0];
        if (dto.fechasaldo) dto.fechasaldo = dto.fechasaldo.split('T')[0];
        const Ventas = await this.ventasRepository.findOneBy({idventa});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
        const editedVentas = Object.assign(Ventas, dto);
        return await this.ventasRepository.update(idventa, editedVentas);

    }

    async deleteOne(idventa: number) {
        const Ventas = await this.ventasRepository.findOneBy({idventa});
        if(!Ventas) throw new NotFoundException ('Venta Inexistente');
        return await this.ventasRepository.delete(idventa);

    }

    async createOne(dto: CreateVentasDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        dto.fecha = dto.fecha.split('T')[0];
        const xVentas = await this.ventasRepository.findOneBy({codigo, cia});
        if(xVentas) {
            throw new NotAcceptableException ('Ya existe ese Venta');
            return;
        }
        dto.fechasaldo=dto.fecha;
        console.log("Creando Venta", dto);

        try {
          const Ventas = this.ventasRepository.create(dto);
          return await this.ventasRepository.save(Ventas);
        } catch (err) {
            console.log("Error al crear la Venta", err);
            throw new NotAcceptableException ('Error al crear la Venta', err);
        }

    }

    async createVenta(data: any) {
        // data está compuesto por
        // data {
        // venta
        // factura
        // renfac
        //}
        const fechayhora = new Date();
        console.log("Fecha y Hora", fechayhora.toDateString(),  "Crear Venta", data);
        try {
            let nvaventa = await this.createOne(data.venta);
            console.log("Nueva Venta", nvaventa);
            const cia = data.venta.cia;
            const idventa = nvaventa.idventa;
            data.factura.idventa = idventa;
            data.factura.fecha = data.factura.fecha.split('T')[0];
            data.venta.fechasaldo = data.venta.fecha;
            const factura = await this.facturasService.createOne(data.factura);
            console.log("Nueva Factura", factura);
            const idfactura = factura.id;
            data.venta.idfactura = idfactura;
            nvaventa.idfactura = idfactura;
            // console.log("Renglones de Factura", data.renfac);

            for(let renglonfac of data.renfac) {
                let conse = 1;
                //console.log("1.- Voy a a agregar renfac", renglonfac);
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
                    conse: conse,
                    cia: cia
                            
                }
                const renfac = await this.renfacService.createOne(nvorenfac);
                //console.log("Renglon Agregado", renfac);
                if(renglonfac.esmoto) {
                    const datos = [
                        { titulo: "MOTOR S/", dato: renglonfac.seriemotor},
                        { titulo: "MARCA:", dato: renglonfac.marca},
                        { titulo: "ADUANA:", dato: renglonfac.aduana},
                        { titulo: "PEDIMIENTO:", dato: renglonfac.pedimento},
                    ]
                    for(let mirenglon of datos) {
                        conse=conse++;
                        const nvorenfac = {
                            idfactura: idfactura,
                            idventa: idventa,
                            codigo: "AUXILIAR",
                            descri: mirenglon.titulo + mirenglon.dato,
                            serie: "",
                            preciou: 0,
                            canti: 1,
                            piva: renglonfac.piva,
                            importe: 0,
                            iva: 16,
                            folio: 0,
                            status: 'A',
                            conse: conse,
                            cia: cia
                                    
                        }
                        const renfac = await this.renfacService.createOne(nvorenfac);
                        //console.log("Moto Renglon Agregado", renfac);

                    }
                }
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

    async importarManyVenytas (data: any) {
        let ventasagregadas = [];
        for(let miventa of data) { 
            const cia = 1;
            const codigo = miventa.numcli;
            const yatengoventa = await this. getOnebyCodigo(cia, codigo);
            if(yatengoventa) {
                 //console.log("Ya Existe esta venta", codigo);
            } else {
                const ventaagregada = await this.importarVentas(miventa);
                ventasagregadas.push(ventaagregada);
            }

        }
        return(ventasagregadas);

    }

    async importarVentas(data: any) {
        // data está compuesto por
        // data {
        // cliente
        // aval
        // venta
        // factura
        // renfac
        // Movimientos
        //}
        try {
            const cia = 1;
            let idciudad = -1;
            const ciudad = await this.ciudadesService.getOnebyCodigo(cia, data.poblac);
            if(ciudad) idciudad = ciudad.id;
            const cliente = {
                id: data.idcli,
                appat: data.appat,
                apmat: data.apmat,
                nombre1: data.nompil1,
                nombre2: data.nompil2,
                nombre: data.nombre,
                codigo: data.numcli,
                calle: data.calle,
                numpredio: data.numpredio,
                codpostal: data.codpostal,
                colonia: data.colonia,
                telefono: data.telefono,
                email:data.email,
                idciudad:idciudad,
                idregimen:data.idregimen,
                cia:data.cia,
                status:'A',
                idnombre: -1,
                rfc:data.rfc,
            }
            let idcliente = data.idcli;
            const clienteold = await this.clientesService.getOnebyCodigo(cia, data.numcli)
            if(clienteold) {
                // console.log("Cliente Existente", clienteold);
                idcliente = clienteold.id;
            } else {
                const nvocliente =  await this.clientesService.createOne(cliente);
                // console.log("Cliente", nvocliente);
                idcliente = nvocliente.id;
            }
            let ubivta = await this.ubivtasService.getOnebyCodigo(cia, data.ubica);
            const idubica = ubivta.id;
            
            const promotor = await this.promotoresService.getOnebyCodigo(cia, data.promotor);
            const idpromotor = promotor.id;
            let vendedor = await this.vendedoresService.getOnebyCodigo(cia, data.vendedor);
            if(!vendedor) {
                vendedor = await this.vendedoresService.getOnebyCodigo(cia, 'XXX');
            }
            const idvendedor = vendedor.id;
            let cartaprom = await this.cartapromService.getOnebyCodigo(cia, data.opcion);
            let idcarta = 1;
            if(cartaprom) idcarta = cartaprom.id;
            const idtienda = Number(data.numcli.substring(0,2));
            const idfactura = -1;
            
            const venta = {
                idventa: data.idcli,
                codigo: data.numcli,
                idcliente: idcliente,
                fecha:data.fechavta,
                opcion: data.opcion,
                descto: data.descuento,
                idtienda: idtienda,
                siono: data.status,
                qom: data.qom,
                ticte: data.ticte,
                letra1: data.letra1,
                enganc: data.enganche,
                nulets: data.nulet,
                canle: data.canle,
                bonifi:data.bonificacion,
                piva: data.piva,
                servicio: data.servicio,
                precon: data.preciolista,
                idvendedor: idvendedor,
                comision: data.comisionvnd,
                prodfin: 0,
                idcarta: idcarta,
                idfactura:  idfactura,
                idpromotor: idpromotor,
                comisionpromotor: data.comisionprom,
                cargos: data.cargos,
                abonos: data.abonos,
                idubica: idubica,
                status: 'C',
                cia: 1,
                fechasaldo: data.fechavta,

            }
            let nvaventa = await this.createOne(venta);
            const idventa = nvaventa.idventa;
            return ({cliente, nvaventa});

        } catch  (err) {
            return ({status: 'ERROR', message:'Ha ocurrido un error', error: err});

        }
    
    }


}
