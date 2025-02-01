import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CLAVES_SOLICIT, CreateDatosolicitudDto, EditDatosolicitudDto } from './dtos';
import { Solicitudes, Datosolicitud } from './entities';

@Injectable()
export class SolicitudesService {
    constructor (
        @InjectRepository(Solicitudes)
        private readonly solicitudesRepository: Repository<Solicitudes>,
        @InjectRepository(Datosolicitud)
        private readonly datossolicitudRepository: Repository<Datosolicitud>,
    ) {}

    async getMany(idcliente: number) :Promise <any[]>  {
        const misventas =  await this.solicitudesRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('concepto')
        .leftJoin(Datosolicitud, 'b', 'a.iddatosolicitud = b.id')
        .where('a.idcliente = :idcliente', {
          idcliente: idcliente
        })
        .orderBy( {iddato: 'ASC'})
        .getRawMany();
        return (misventas);
    }

    async getOne(cia:number, idcliente: number) : Promise<any> {
        const solicitud = await this.solicitudesRepository.findBy({cia, idcliente});
        if(!solicitud) throw new NotFoundException ('Solicitud Inexistente');
       return solicitud;
    }

    async editOne(id: number, dto: any) {
        const Vendedor = await this.solicitudesRepository.findOneBy({id});
        if(!Vendedor) throw new NotFoundException ('Solicitud Inexistente');
        const editedVendedor = Object.assign(Vendedor, dto);
        return await this.solicitudesRepository.update(id, editedVendedor);

    }

    async deleteOne(id: number) {
        const Vendedor = await this.solicitudesRepository.findOneBy({id});
        if(!Vendedor) throw new NotFoundException ('Solicitud Inexistente');
        return await this.solicitudesRepository.delete(id);

    }

    async createSolicitudCompleta(dto: any) {
        let solicit = [];
        //console.log("Solicitud", dto);
        const cia = dto.cia;
        const idcliente = dto.idcliente;
        let  misolicitud = null;
        let minvasolicitud = null;
        for(let midatosolicit of dto.datos) {
            const nvoconcepto = {
                cia: cia,
                concepto: midatosolicit.concepto,
                iddatosolicitud: midatosolicit.id
            }
            const miconcepto = await this.buscaconcepto(nvoconcepto);
            const midtosolicitud = {
                idcliente: idcliente,
                iddato: midatosolicit.id,
                iddatosolicitud: miconcepto.id,
                status: 'A',
                cia: cia
            }
            const iddato = midatosolicit.id;
            const misolicitudx = await this.solicitudesRepository.findOneBy({idcliente, iddato});
            if(!misolicitudx) {
                misolicitud = this.solicitudesRepository.create(midtosolicitud);
                minvasolicitud = await this.solicitudesRepository.save(misolicitud);
            } else {
                const id = misolicitudx.id;
                misolicitud = Object.assign(misolicitudx, midtosolicitud);
                minvasolicitud =await this.solicitudesRepository.update(id, misolicitud);

            }

            solicit.push(minvasolicitud);
        }
        return solicit;

    }

    async importarSolicitudCompleta(dto: any) {
        let solicit = [];
        //console.log("Solicitud", dto);
        const cia = dto.cia;
        const idcliente = dto.idcli;
        let iddatosol = 0;
        let datosol = 0;
        let concepto = "";
        let midatosol = {
            idcli: idcliente, 
            datosol:CLAVES_SOLICIT.CLIENTE_SEXO, 
            concepto:dto.sexo 
        }
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_EDAD;
        midatosol.concepto = dto.edad;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_EDOCIVIL;
        midatosol.concepto = dto.estadocivil;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_DEPENDIENTES;
        midatosol.concepto = dto.dependientes;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.OCUPACION;
        midatosol.concepto = dto.ocupacion;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_INGRESOS;
        midatosol.concepto = dto.ingresos;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_LGAR_TRABAJO;
        midatosol.concepto = dto.trabajo;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_TEL_TRABAJO;
        midatosol.concepto = dto.telefono;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_DIREC_TRABAJO;
        midatosol.concepto = dto.direcciontrabajo;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_ANTIGUEDAD_TRABAJO;
        midatosol.concepto = dto.antiguedad;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_NOMBRE;
        midatosol.concepto = dto.conyuge;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_OCUPACION;
        midatosol.concepto = dto.ocupacionconyuge;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_TRABAJO;
        midatosol.concepto = dto.trabajoconyuge;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_TEL_TRABAJO;
        midatosol.concepto = dto.telefonoconyuge;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_DIREC_TRABAJO;
        midatosol.concepto = dto.direcciontrabconyuge;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_INGRESOS;
        midatosol.concepto = dto.ingresosconyuge;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_ANTIGUEDAD;
        midatosol.concepto = dto.antiguedadconyuge;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_GENERALES;
        midatosol.concepto = dto.aval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_OCUPACION;
        midatosol.concepto = dto.ocupacionaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_TRABAJO;
        midatosol.concepto = dto.trabajoaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_TELFONO;
        midatosol.concepto = dto.telefonoaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_TRABAJO;
        midatosol.concepto = dto.directrabaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_INGRESOS;
        midatosol.concepto = dto.ingresosaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_ANTIGUEDAD_TRABAJO;
        midatosol.concepto = dto.antiguedadaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_NOMBRE;
        midatosol.concepto = dto.conyugeaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_OCUPACION;
        midatosol.concepto = dto.ocupacionconyugeaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_TRABAJO;
        midatosol.concepto = dto.trabajoconyugeaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_TELEFONO;
        midatosol.concepto = dto.telconyugeaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_DIREC_TRABAJO;
        midatosol.concepto = dto.direcciontrabajoconyugeaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_INGRESOS;
        midatosol.concepto = dto.ingresosconyugeaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_ANTIGUEDAD;
        midatosol.concepto = dto.antiguedadconyugeaval;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.FAMILIAR_NOMBRE;
        midatosol.concepto = dto.familiar;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.FAMILIAR_DIREC;
        midatosol.concepto = dto.direccionfamiliar;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CONOCIDO_NOMBRE;
        midatosol.concepto = dto.conocido;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.CONOCIDO_DIREC;
        midatosol.concepto = dto.direccionconocido;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.REFERENCIA1;
        midatosol.concepto = dto.referencia1;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.REFERENCIA2;
        midatosol.concepto = dto.referencia2;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        midatosol.datosol = CLAVES_SOLICIT.OBSERVACIONES;
        midatosol.concepto = dto.observaciones;
        iddatosol = await this.crearDatoSolicitud(midatosol);
        solicit.push(iddatosol);
        return solicit;

    }

    async crearDatoSolicitud(dto: any) {
        const signosparam = '?,'.repeat(2) + '?';
        
        const agregadatosol = await this.datossolicitudRepository
        .query( `CALL importa_solicitud(${signosparam})`,
          [ 
            dto.idcli,
            dto.datosol,
            dto.concepto.trim()
          ]
        );
        return (agregadatosol)

    }



    async buscaconcepto(midatosolicit: any) {
        const cia = midatosolicit.cia;
        const concepto = midatosolicit.concepto;

        let miconcepto = await this.datossolicitudRepository.findOneBy({cia, concepto});
        if(!miconcepto) {
            const dtonvoconcepto = {
                concepto : concepto,
                cia: cia
            };
            const nvoconcepto = this.datossolicitudRepository.create(dtonvoconcepto);
            miconcepto = await this.datossolicitudRepository.save(nvoconcepto);
        }
        return (miconcepto);
    }

    async createOne(dto: any) {
        const idcliente = 0;
        let codigo = "";
        let cia = dto.cia;
        const xVendedor = await this.solicitudesRepository.findOneBy({idcliente, cia});
        if(xVendedor) {
            throw new NotAcceptableException ('Ya existe esa Solicitud');
            return;
        }

        const Vendedor = this.solicitudesRepository.create(dto);
        return await this.solicitudesRepository.save(Vendedor);

    }


}
