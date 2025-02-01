
import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreateUsocfdiDto, EditUsocfdiDto } from './dtos';
import { Usocfdi } from './entities';

@Injectable()
export class UsocfdiService {

    constructor (
        @InjectRepository(Usocfdi)
        private readonly UsocfdiRepository: Repository<Usocfdi>
    )
    {}

    async getMany(cia: number) :Promise <Usocfdi[]>  {
        return await this.UsocfdiRepository.find(
            {
                where: { cia : cia},
                order: { clave: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Usocfdi> {
        const Usocfdi = await this.UsocfdiRepository.findOneBy({cia, id});
        if(!Usocfdi) throw new NotFoundException ('Uso Cfdi Inexistente');
       return Usocfdi;
    }

    async getOnebyCodigo(cia:number, clave: string) : Promise<Usocfdi> {
        const Usocfdi = await this.UsocfdiRepository.findOneBy({cia, clave});
       return Usocfdi;
    }

    async editOne(id: number, dto: EditUsocfdiDto) {
        const Usocfdi = await this.UsocfdiRepository.findOneBy({id});
        if(!Usocfdi) throw new NotFoundException ('Uso Cfdi Inexistente');
        const editedUsocfdi = Object.assign(Usocfdi, dto);
        return await this.UsocfdiRepository.update(id, editedUsocfdi);

    }

    async deleteOne(id: number) {
        const Usocfdi = await this.UsocfdiRepository.findOneBy({id});
        if(!Usocfdi) throw new NotFoundException ('Uso Cfdi Inexistente');
        return await this.UsocfdiRepository.delete(id);

    }

    async createOne(dto: CreateUsocfdiDto) {
        let clave = dto.clave;
        let cia = dto.cia;
        const xUsocfdi = await this.UsocfdiRepository.findOneBy({clave, cia});
        if(xUsocfdi) {
            throw new NotAcceptableException ('Ya existe ese Uso Cfdi');
            return;
        }

        const Usocfdi = this.UsocfdiRepository.create(dto);
        return await this.UsocfdiRepository.save(Usocfdi);

    }

}
