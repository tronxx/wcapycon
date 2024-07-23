
import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConceptoDto, EditConceptoDto } from './dtos';
import { Conceptos } from './entities';

@Injectable()
export class ConceptosService {

    constructor (
        @InjectRepository(Conceptos)
        private readonly conceptosRepository: Repository<Conceptos>
    )
    {}

    async getMany(concepto: string) :Promise <Conceptos[]>  {
        return await this.conceptosRepository.find(
            {
                where: { concepto}
            }
        );
    }

    async getOne(concepto: string, id: number) : Promise<Conceptos> {
        const Conceptos = await this.conceptosRepository.findOneBy({id});
        if(!Conceptos) throw new NotFoundException ('Uso Cfdi Inexistente');
       return Conceptos;
    }

    async editOne(id: number, dto: EditConceptoDto) {
        const Conceptos = await this.conceptosRepository.findOneBy({id});
        if(!Conceptos) throw new NotFoundException ('Concepto Inexistente');
        const editedConceptos = Object.assign(Conceptos, dto);
        return await this.conceptosRepository.update(id, editedConceptos);

    }

    async deleteOne(id: number) {
        const Conceptos = await this.conceptosRepository.findOneBy({id});
        if(!Conceptos) throw new NotFoundException ('Uso Cfdi Inexistente');
        return await this.conceptosRepository.delete(id);

    }

    async createOne(dto: CreateConceptoDto) {
        let concepto = dto.concepto;
        let nvoconcepto = null;
        const xConceptos = await this.conceptosRepository.findOneBy({concepto});
        if(xConceptos) {
            return xConceptos;
        } else {
            const Conceptos = this.conceptosRepository.create(dto);
            return await this.conceptosRepository.save(Conceptos);
        }
    }

}
