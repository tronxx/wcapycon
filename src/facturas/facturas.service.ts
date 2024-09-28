import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacturasDto, EditFacturaDto } from './dtos';
import { Facturas } from './entities';
import { Usocfdi } from '../usdocfdi/entities';
import { Metodopago } from '../metodopago/entities';

@Injectable()
export class FacturasService {

    constructor (
        @InjectRepository(Facturas)
        private readonly facturasrepository: Repository<Facturas>,
        @InjectRepository(Usocfdi)
        private readonly usocfdiRepository: Repository<Usocfdi>,
        @InjectRepository(Metodopago)
        private readonly metodopagoRepository: Repository<Metodopago>,

    )
    {}

    async getMany(cia: number) :Promise <Facturas[]>  {
        const fechaini = "";
        const fechafin = "zz"
        const query = this.facturasrepository.createQueryBuilder('a')
        .select(['a.*','b.clave as codigousocfdi',
        'b.nombre as conceptousofdi',
        'c.clave as codigometodopago',
        'c.nombre as conceptometodopago'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
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
        'b.nombre as conceptousofdi',
        'c.clave as codigometodopago',
        'c.nombre as conceptometodopago'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
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
        'b.nombre as conceptousofdi',
        'c.clave as codigometodopago',
        'c.nombre as conceptometodopago'
        ])
        .leftJoin(Usocfdi, 'b', 'a.idusocfdi = b.id')
        .leftJoin(Metodopago, 'c', 'a.idmetodopago = c.id')
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

}
