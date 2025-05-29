import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreatePolizasDto, EditPolizaDto } from './dtos';

import { Polizas, Car_anuscartera, Car_corlarpzo, Car_corlarpzodet } from './entities';
import { Codigoscartera } from '../codigoscartera/entities';
import { Codigoscaja } from '../codigoscaja/entities';
import { Renpol } from '../renpol/entities';
import { Ventas } from '../ventas/entities';

@Injectable()
export class PolizasService {

    constructor (
        @InjectRepository(Polizas)
        private readonly polizasRepository: Repository<Polizas>,
        @InjectRepository(Codigoscaja)
        private readonly almacenesRepository: Repository<Codigoscaja>,
        @InjectRepository(Car_anuscartera)
        private readonly caranuscarteraRepository: Repository<Car_anuscartera>,
        @InjectRepository(Car_corlarpzo)
        private readonly carcorlarpzoRepository: Repository<Car_corlarpzo>,
        @InjectRepository(Car_corlarpzodet)
        private readonly carcorlarpzodetRepository: Repository<Car_corlarpzodet>,
        @InjectRepository(Codigoscaja)
        private readonly codigoscajaRepository: Repository<Codigoscaja>,
        @InjectRepository(Renpol)
        private readonly renpolRepository: Repository<Renpol>,
        @InjectRepository(Ventas)
        private readonly ventasRepository: Repository<Ventas>,

    )
    {}

    async getMany(idtienda: number) :Promise <Polizas[]>  {
        return await this.polizasRepository.find(
            {
                where: { idtienda },
                order: { fecha: 'ASC'}
            }
        );
    }

    async getManyByFecha(cia: number, idtienda: number, fechaini: string, fechafin: string ) :Promise <any[]>  {
        const mispolizas =  await this.polizasRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.nombre as nombretda')
        .leftJoin(Codigoscaja, 'b', 'a.idtienda = b.id')
        .where('a.fecha BETWEEN :startDate AND :endDate', {
          startDate: fechaini,
          endDate: fechafin,
        })
        .andWhere('a.idtienda =:idtienda', {idtienda})
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {fecha: 'ASC'})
        .getRawMany();
        return (mispolizas);
    }

    async getOne(cia:number, id: number) : Promise<any> {
            const mispolizas =  await this.polizasRepository
            .createQueryBuilder('a')
            .select('a.*')
            .addSelect ('b.nombre as nombretda')
            .leftJoin(Codigoscaja, 'b', 'a.idtienda = b.id')
            .where('a.id = :id', {id})
            .andWhere('a.cia =:cia', {cia})
            .getRawOne();
            return (mispolizas);
   
    }

    async editOne(id: number, dto: EditPolizaDto) {
        const Polizas = await this.polizasRepository.findOneBy({id});
        if(!Polizas) throw new NotFoundException ('Poliza Inexistente');
        const editedPolizas = Object.assign(Polizas, dto);
        return await this.polizasRepository.update(id, editedPolizas);

    }

    async deleteOne(id: number) {
        const Polizas = await this.polizasRepository.findOneBy({id});
        if(!Polizas) throw new NotFoundException ('Poliza Inexistente');
        return await this.polizasRepository.delete(id);

    }

    async createOne(dto: CreatePolizasDto) {
        const fecha = dto.fecha;
        const tda = dto.tda
        const poliza = await this.polizasRepository.findOneBy({fecha, tda});
        if(poliza) return poliza;
        const nvapoliza = this.polizasRepository.create(dto);
        return await this.polizasRepository.save(nvapoliza);
    }

    async getPolizasResumen(fechaini: string, fechafin: string, tdaini: string, tdafin: string, cia: number) {
        const startDate = fechaini;
        const endDate = fechafin;
    
        return await this.polizasRepository
          .createQueryBuilder('g')
          .innerJoin(Renpol, 'a', 'g.id = a.idpoliza')
          .innerJoin(Ventas, 'b', 'a.idventa = b.idventa')
          .innerJoin(Car_corlarpzodet, 'd', 'b.qom = d.qom AND b.nulets = d.nulets')
          .innerJoin(Car_corlarpzo, 'c', 'd.idcorlarpzo = c.id')
          .innerJoin(Codigoscartera, 'f', 'b.idtienda = f.id')
          .innerJoin(
            Car_anuscartera,
            'e',
            '(YEAR(b.fecha) >= e.anuini AND YEAR(b.fecha) <= e.anufin) AND d.idanucartera = e.id',
          )
          .select([
            'e.anucartera AS anucartera',
            'f.codigo as codcartera',
            'f.nombre as nombrecartera',
            'c.tiplazo AS tiplazo',
            'c.descri AS descriplazo',
            'e.descri AS descri',
            'SUM(a.importe) AS total_importe',
            `SUM(CASE a.tipo WHEN 'AB' THEN a.rob ELSE 0 END) AS bonif`,
            `SUM(CASE a.tipo WHEN 'AR' THEN a.rob ELSE 0 END) AS recar`,
            `SUM(ROUND((b.precon * (16 / 100 + 1) - b.enganc) / (b.nulets * (a.importe / (b.canle + 0.01)) + 0.01), 2)) AS valmcia`,
          ])
          .where('g.fecha BETWEEN :startDate AND :endDate', { startDate, endDate })
          .andWhere("g.cia = :cia", {cia})
          .andWhere("g.tda between :tdaini and :tdafin", {tdaini, tdafin})
          .andWhere("b.siono = '*'")
          .groupBy('c.tiplazo, c.descri, f.codigo, f.nombre, e.anucartera, e.descri')
          .getRawMany();
      }

}
