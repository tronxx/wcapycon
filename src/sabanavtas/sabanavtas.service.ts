import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSabanavtasDto, CreateSabanavtasrenDto, EditSabanavtarenDto, EditSabanavtasDto } from './dtos';
import { Sabanavtas, Sabanvtasren } from './entities';

@Injectable()
export class SabanavtasService {

    constructor (
        @InjectRepository(Sabanavtas)
        private readonly sabanavtasRepository: Repository<Sabanavtas>,
        @InjectRepository(Sabanvtasren)
        private readonly sabanavtarenRepository: Repository<Sabanvtasren>,

    ) {}

    async getMany(cia: number) :Promise <Sabanavtas[]>  {
        return await this.sabanavtasRepository.find(
            {
                where: { cia : cia},
                order: { fecha: "ASC"}
            }
        );
    }

    async getOneSabana(cia: number, id:number) :Promise <Sabanavtas>  {
        return await this.sabanavtasRepository.findOne(
            {
                where: { cia : cia, id: id },
            }
        );
    }

    async craeteOneSabana(dto: CreateSabanavtasDto) :Promise <Sabanavtas>  {
        let folio = dto.folio;
        let cia = dto.cia;
        dto.fecha = dto.fecha.split('T')[0];
        const xSabana  = await this.sabanavtasRepository.findOneBy({folio, cia});
        if(xSabana) {
            throw new NotAcceptableException ('Ya existe ese Folio');
            return;
        }

        const Ventas = this.sabanavtasRepository.create(dto);
        return await this.sabanavtasRepository.save(Ventas);
    }

    async getRenSabanaMany(cia:number, idsabana: number) :Promise <Sabanvtasren[]>  {
        return await this.sabanavtarenRepository.find(
            {
                where: { idsabana : idsabana},
                order: { id: "ASC"}
            }
        );
    }

    async delRensabana(id:number, idsabana: number)   {
        const Rensabana = await this.sabanavtarenRepository.findOneBy({id});
        if(!Rensabana) throw new NotFoundException ('Renglon no encontrado');
        return await this.sabanavtasRepository.delete(id);
    }

    async delSabana(cia:number, idsabana: number)   {
        const Sabana = await this.sabanavtasRepository.findOneBy({id: idsabana});
        if(!Sabana) throw new NotFoundException ('Sabana no encontrado');
        const Rensabana = await this.sabanavtarenRepository.findBy({idsabana:idsabana});
        if(Rensabana.length) throw new NotAcceptableException ('Sabana con renglones');
        return await this.sabanavtasRepository.delete(idsabana);
    }
}
