import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CLAVES_SOLICIT, CreateDatosolicitudDto, EditDatosolicitudDto, TIPOS_SOLICIT } from './dtos';
import { Solicitudes, Datosolicitud } from './entities';

@Injectable()
export class SolicitudesService {
    constructor (
        @InjectRepository(Solicitudes)
        private readonly solicitudesRepository: Repository<Solicitudes>,
        @InjectRepository(Datosolicitud)
        private readonly datossolicitudRepository: Repository<Datosolicitud>,
    ) {}

    async getMany(idcliente: number, tipo:number) :Promise <any[]>  {
        const misventas =  await this.solicitudesRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('concepto')
        .leftJoin(Datosolicitud, 'b', 'a.iddatosolicitud = b.id')
        .where('a.idcliente = :idcliente', {
          idcliente: idcliente
        })
        .andWhere('a.tipo =:tipo', {tipo})
        .orderBy( {iddato: 'ASC'})
        .getRawMany();
        return (misventas);
    }

    async getDatoEspecifico(cia: number, idcliente: number, iddato:number, tipo: number) :Promise <any>  {
        const misventas =  await this.solicitudesRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('concepto')
        .leftJoin(Datosolicitud, 'b', 'a.iddatosolicitud = b.id')
        .where('a.idcliente = :idcliente', {
          idcliente: idcliente
        })
        .andWhere('a.tipo =:tipo', {tipo})
        .andWhere('a.iddato = :iddato' , {iddato: iddato})
        .getRawOne();
        // console.log("Estoy en getDatoEspecifico", cia, idcliente, iddato, tipo);
        if(!misventas) {
            return ({concepto: 'false'});
        } else {
            return (misventas);
        }
        
    }

    async getLetrasImpresas(cia: number, idcliente: number, tipo: number) :Promise <any>  {
        const iddatoini = CLAVES_SOLICIT.LETRASIMPRESAS;
        const iddatofin = iddatoini + 99;
        const midatosol =  await this.solicitudesRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('concepto')
        .leftJoin(Datosolicitud, 'b', 'a.iddatosolicitud = b.id')
        .where('a.idcliente = :idcliente', {
          idcliente: idcliente
        })
        .andWhere('a.tipo = :tipo', {tipo:tipo})
        .andWhere('a.iddato BETWEEN :iddatoini and :iddatofin', 
            {iddatoini: iddatoini, iddatofin: iddatofin})
        .getRawMany();
        return (midatosol);
    }

    async getDatoSolicit(cia: number, idcliente: number, tipo: number, tipodato: number) :Promise <any>  {
        const iddatoini = tipodato;
        const iddatofin = tipodato;
        const midatosol =  await this.solicitudesRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('concepto')
        .leftJoin(Datosolicitud, 'b', 'a.iddatosolicitud = b.id')
        .where('a.idcliente = :idcliente', {
          idcliente: idcliente
        })
        .andWhere('a.tipo = :tipo', {tipo:tipo})
        .andWhere('a.iddato BETWEEN :iddatoini and :iddatofin', 
            {iddatoini: iddatoini, iddatofin: iddatofin})
        .getRawMany();
        return (midatosol);
    }

    async getOne(cia:number, idcliente: number, tipo: number) : Promise<any> {
        const solicitud = await this.solicitudesRepository.findBy({cia, idcliente, tipo});
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
        const tipo = dto.tipo;
        let  misolicitud = null;
        let minvasolicitud = null;
        for(let midatosolicit of dto.datos) {
            const nvodatosol = {
                    idcli: idcliente, 
                    tipo: tipo,
                    cia: cia,
                    datosol:midatosolicit.id,
                    concepto:midatosolicit.concepto,
                    status: 'A',
            }

            const midatosol = await this.grabarDatoSolicitud(nvodatosol);
            solicit.push(midatosol);
        }
        return solicit;

    }

    async grabarLetrasImpresas(dto: any) {
        let solicit = [];
        const cia = dto.cia;
        const idcliente = dto.idcliente;
        const tipo = dto.tipo;
        const ltaini = dto.ltaini;
        const ltafin = dto.ltafin;
        let  misolicitud = null;
        let minvasolicitud = null;
        let jj_z = 0;
        let midatosolicit = {
            cia: cia,
            concepto: "",
            id: jj_z,
            idcliente: idcliente,
            tipo: tipo,
        }

        for(let ii_z = ltaini; ii_z <= ltafin; ii_z++) {
            jj_z = ii_z + CLAVES_SOLICIT.LETRASIMPRESAS;
            midatosolicit.concepto = jj_z.toString().padStart(2, '0');
            midatosolicit.id = jj_z;
            const midatosol = await this.grabarDatoSolicitud(midatosolicit);
            solicit.push(midatosol);
        }
        return solicit;

    }

    async grabarDatoSolicitud(dto: any) {
        //console.log("Solicitud", dto);
        const cia = dto.cia;
        const idcliente = dto.idcliente;
        const tipo = dto.tipo;
        const iddato = dto.id;
        let  misolicitud = null;
        const nvoconcepto = {
                cia: cia,
                concepto: dto.concepto,
                iddatosolicitud: iddato
        }
        let minvasolicitud = null;
            const miconcepto = await this.buscaconcepto(nvoconcepto);
            const midtosolicitud = {
                idcliente: idcliente,
                tipo: tipo,
                iddato: iddato,
                iddatosolicitud: miconcepto.id,
                status: 'A',
                cia: cia
            }
            const misolicitudx = await this.solicitudesRepository.findOneBy({idcliente, iddato});
            if(!misolicitudx) {
                misolicitud = this.solicitudesRepository.create(midtosolicitud);
                minvasolicitud = await this.solicitudesRepository.save(misolicitud);
            } else {
                const id = misolicitudx.id;
                misolicitud = Object.assign(misolicitudx, midtosolicitud);
                minvasolicitud =await this.solicitudesRepository.update(id, misolicitud);
            }
            return(minvasolicitud);
    }


    async importarSolicitudCompleta(dto: any) {
        let solicit = [];
        //console.log("Solicitud", dto);
        const cia = dto.cia;
        const tipo = TIPOS_SOLICIT.VENTA;
        let idcliente = 1;
        let iddatosol = 0;
        let datosol = 0;
        let concepto = "";
        let midatosol = {
            idcli: -1,
            tipo: tipo,
            datosol:CLAVES_SOLICIT.CLIENTE_SEXO, 
            concepto:"" 
        }

        if(dto) {
            idcliente = dto.idcli;
            if (dto.sexo) {
                midatosol = {
                    idcli: idcliente, 
                    tipo: tipo,
                    datosol:CLAVES_SOLICIT.CLIENTE_SEXO, 
                    concepto:dto.sexo 
                }
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }
            if(dto.edad) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_EDAD;
                midatosol.concepto = dto.edad;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }
            if(dto.estadocivil) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_EDOCIVIL;
                midatosol.concepto = dto.estadocivil;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
    
            }
            if(dto.dependientes) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_DEPENDIENTES;
                midatosol.concepto = dto.dependientes;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.ocupacion) {
                midatosol.datosol = CLAVES_SOLICIT.OCUPACION;
                midatosol.concepto = dto.ocupacion;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.ingresos) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_INGRESOS;
                midatosol.concepto = dto.ingresos;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.trabajo) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_LGAR_TRABAJO;
                midatosol.concepto = dto.trabajo;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.telefono) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_TEL_TRABAJO;
                midatosol.concepto = dto.telefono;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.direcciontrabajo) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_DIREC_TRABAJO;
                midatosol.concepto = dto.direcciontrabajo;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.antiguedad) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_ANTIGUEDAD_TRABAJO;
                midatosol.concepto = dto.antiguedad;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }


            if(dto.conyuge) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_NOMBRE;
                midatosol.concepto = dto.conyuge;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.ocupacionconyuge) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_OCUPACION;
                midatosol.concepto = dto.ocupacionconyuge;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.trabajoconyuge) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_TRABAJO;
                midatosol.concepto = dto.trabajoconyuge;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);    
            }

            if(dto.telefonoconyuge) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_TEL_TRABAJO;
                midatosol.concepto = dto.telefonoconyuge;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.direcciontrabconyuge) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_DIREC_TRABAJO;
                midatosol.concepto = dto.direcciontrabconyuge;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.ingresosconyuge) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_INGRESOS;
                midatosol.concepto = dto.ingresosconyuge;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);    
            }

            if(dto.antiguedadconyuge) {
                midatosol.datosol = CLAVES_SOLICIT.CLIENTE_CONYUGE_ANTIGUEDAD;
                midatosol.concepto = dto.antiguedadconyuge;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.aval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_GENERALES;
                midatosol.concepto = dto.aval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.ocupacionaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_OCUPACION;
                midatosol.concepto = dto.ocupacionaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);    
            }

            if(dto.trabajoaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_TRABAJO;
                midatosol.concepto = dto.trabajoaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.estadocivil) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_TELFONO;
                midatosol.concepto = dto.telefonoaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.directrabaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_TRABAJO;
                midatosol.concepto = dto.directrabaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.ingresosaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_INGRESOS;
                midatosol.concepto = dto.ingresosaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }


            if(dto.antiguedadaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_ANTIGUEDAD_TRABAJO;
                midatosol.concepto = dto.antiguedadaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }


            if(dto.conyugeaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_NOMBRE;
                midatosol.concepto = dto.conyugeaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.ocupacionconyugeaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_OCUPACION;
                midatosol.concepto = dto.ocupacionconyugeaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.trabajoconyugeaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_TRABAJO;
                midatosol.concepto = dto.trabajoconyugeaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.telconyugeaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_TELEFONO;
                midatosol.concepto = dto.telconyugeaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.direcciontrabajoconyugeaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_DIREC_TRABAJO;
                midatosol.concepto = dto.direcciontrabajoconyugeaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.ingresosconyugeaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_INGRESOS;
                midatosol.concepto = dto.ingresosconyugeaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);    
            }

            if(dto.antiguedadconyugeaval) {
                midatosol.datosol = CLAVES_SOLICIT.AVAL_CONYUGE_ANTIGUEDAD;
                midatosol.concepto = dto.antiguedadconyugeaval;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);    
            }

            if(dto.familiar) {
                midatosol.datosol = CLAVES_SOLICIT.FAMILIAR_NOMBRE;
                midatosol.concepto = dto.familiar;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);    
            }

            if(dto.direccionfamiliar) {
                midatosol.datosol = CLAVES_SOLICIT.FAMILIAR_DIREC;
                midatosol.concepto = dto.direccionfamiliar;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.conocido) {
                midatosol.datosol = CLAVES_SOLICIT.CONOCIDO_NOMBRE;
                midatosol.concepto = dto.conocido;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);    
            }

            if(dto.direccionconocido) {
                midatosol.datosol = CLAVES_SOLICIT.CONOCIDO_DIREC;
                midatosol.concepto = dto.direccionconocido;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.referencia1) {
                midatosol.datosol = CLAVES_SOLICIT.REFERENCIA1;
                midatosol.concepto = dto.referencia1;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.referencia2) {
                midatosol.datosol = CLAVES_SOLICIT.REFERENCIA2;
                midatosol.concepto = dto.referencia2;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);
            }

            if(dto.observaciones) {
                midatosol.datosol = CLAVES_SOLICIT.OBSERVACIONES;
                midatosol.concepto = dto.observaciones;
                iddatosol = await this.crearDatoSolicitud(midatosol);
                solicit.push(iddatosol);                
            }
        }
        return solicit;

    }

    async crearDatoSolicitud(dto: any) {
        const signosparam = '?,'.repeat(3) + '?';
        let concepto = (dto.concepto + " ").trim();
        const agregadatosol = await this.datossolicitudRepository
        .query( `CALL importa_solicitud(${signosparam})`,
          [ 
            dto.idcli,
            dto.tipo,
            dto.datosol,
            concepto
          ]
        );
        return (agregadatosol)

    }


    async buscaconcepto(midatosolicit: any) {
        const cia = midatosolicit.cia;
        const concepto = midatosolicit.concepto;
        //console.log("Estoy buscando concepto", midatosolicit);

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
