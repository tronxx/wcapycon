import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDatosolicitudDto, EditDatosolicitudDto } from './dtos';
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
