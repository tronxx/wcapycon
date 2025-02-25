import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreateAvalesDto, EditAvalDto,  } from './dtos';
import { Avales } from './entities';
import { Ciudades } from '../ciudades/entities';
import { CiudadesService } from '../ciudades/ciudades.service';

@Injectable()
export class AvalesService {

    constructor (
        @InjectRepository(Avales)
        private readonly avalesRepository: Repository<Avales>,
        @InjectRepository(Ciudades)
        private readonly ciudadesRepository: Repository<Ciudades>,
        private ciudadesService: CiudadesService,
    )
    {}

    async getMany(cia: number) :Promise <Avales[]>  {
        return await this.avalesRepository.findBy(
            {
                 cia
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Avales> {
        const Aval = await this.avalesRepository.findOneBy({ id});
        if(!Aval) throw new NotFoundException ('Aval Inexistente');
       return Aval;
    }

    async editOne(id: number, dto: EditAvalDto) {
        const Aval = await this.avalesRepository.findOneBy({id});
        if(!Aval) throw new NotFoundException ('Aval Inexistente');
        const editedAval = Object.assign(Aval, dto);
        return await this.avalesRepository.update(id, editedAval);

    }

    async deleteOne(id: number) {
        const Aval = await this.avalesRepository.findOneBy({id});
        if(!Aval) throw new NotFoundException ('Aval Inexistente');
        return await this.avalesRepository.delete(id);

    }

    async createOne(dto: CreateAvalesDto) {
        const Aval = this.avalesRepository.create(dto);
        return await this.avalesRepository.save(Aval);

    }

    async importarAval(dto: any) {
        let codigo = dto.codigo;
        const cia = 1;
        let idciudad = -1;
        const poblac = dto.dirav2.trim();
        const nombre = dto.nomav.trim();
        if(nombre == '') {
            return '{}';
        }
        const ciudad = await this.ciudadesService.getOnebyCodigo(cia, poblac);
        if(ciudad) idciudad = ciudad.id;
        const dtoaval = {
            codigo: dto.idcli,
            nombre: dto.nomav,
            id: dto.idcli,
            calle: dto.dirav1,
            colonia: dto.colonia,
            idciudad: idciudad,
            cia: cia,
            idventa: dto.idcli
        }
        const newAval = await this.createOneAval(dtoaval);
        return (newAval);
    }    

    async createOneAval(dto: any) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xAval = await this.avalesRepository.findOneBy({codigo, cia});
        if(xAval) {
            throw new NotAcceptableException ('Ya existe ese Aval');
            return;
        }

        let dtocliente = new CreateAvalesDto;
        dtocliente.nombre = dto.nombre;
        dtocliente.id = dto.id;
        dtocliente.idventa = dto.idventa;
        dtocliente.codigo = dto.codigo;
        dtocliente.calle = dto.calle;
        dtocliente.numpredio = dto.numpredio;
        dtocliente.colonia = dto.colonia;
        dtocliente.telefono = dto.telefono;
        dtocliente.email = dto.email;
        dtocliente.codpostal = dto.codpostal;
        dtocliente.idciudad = dto.idciudad;
        dtocliente.idregimen = dto.idregimen;
        dtocliente.cia = dto.cia;
        dtocliente.status = 'A';
        dtocliente.rfc = dto.rfc;
        const Aval = this.avalesRepository.create(dtocliente);
        return await this.avalesRepository.save(Aval);
    }

    async getOneAvalbyIdVenta(cia:number, idventa: number) : Promise<any> {
        const misventas =  await this.avalesRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.ciudad as ciudad')
        .leftJoin(Ciudades, 'b', 'a.idciudad = b.id')
        .where('a.idventa = :idventa', {idventa: idventa})
        .getRawOne();
        return (misventas);
   }

}
