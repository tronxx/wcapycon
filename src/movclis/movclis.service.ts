import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovclisDto, EditMovcliDto } from './dtos';
import { Movclis } from './entities';
import { Codigoscaja } from '../codigoscaja/entities'
import { Conceptos } from 'src/conceptos/entities';
import { Renfac } from '../renfac/entities';
import { RenfacService } from '../renfac/renfac.service';
import { Ventas } from '../ventas/entities';

@Injectable()
export class MovclisService {

    constructor (
        @InjectRepository(Movclis)
        private readonly movclisRepository: Repository<Movclis>,
        @InjectRepository(Movclis)
        private readonly renfacRepository: Repository<Renfac>,
        @InjectRepository(Ventas)
        private readonly ventasRepository: Repository<Ventas>,
        private renfacService : RenfacService,
    )
    {}

    async getMany(idventa: number, cia: number) :Promise <any[]>  {
        const artcompra = await this.renfacService.getCompraByIdVenta(idventa);
        console.log("ArtCompra:", artcompra);
        const venta = await this.ventasRepository.findOneBy({idventa: idventa, cia: cia});
        console.log("Venta:", venta);
        const fechacompra = venta.fecha;
        console.log("FechaCompra:", fechacompra);

        let mismovtos =  await this.movclisRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.concepto ')
        .addSelect('c.tda as tda')
        .addSelect(`(case coa when 'C' then importe else null end) as cargos`)
        .addSelect(`(case coa when 'A' then importe else null end) as abonos`)
        .addSelect(`(case tipopago when 'AB' then recobon else null end) as bonifica`)
        .addSelect(`(case tipopago when 'AR' then recobon else null end) as recargo`)
        .leftJoin(Conceptos, 'b', 'a.idconcepto = b.id')
        .leftJoin(Codigoscaja, 'c', 'a.idpoliza = c.id')
        .where('a.idventa =:idventa',  {idventa})
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {fecha: 'ASC', consecutivo:'ASC'})
        .getRawMany();
        console.log("Movtos:", mismovtos);
        
        let compra = {
            fecha: fechacompra,
            id : -1,
            concepto : artcompra.compra,
            abonos: 0,
            cargos: 0,
            coa: 'C'
        }
        console.log("Compra:", compra);
        mismovtos = [compra, ...mismovtos];
        return (mismovtos);
    }

    async getRecargosCobrados(idventa: number, letra:number, cia: number) :Promise <any[]>  {
        const concepto = '\'%' +  (letra.toString().padStart(2, '0')) + '/%\'';
        //console.log("Concepto:", concepto);
        const mirecargo =  await this.movclisRepository
        .createQueryBuilder('a')
        .select('sum(recobon) as recargos')
        .leftJoin(Conceptos, 'b', 'a.idconcepto = b.id')
        .where('a.idventa =:idventa and b.concepto like ' + concepto,  {idventa, concepto})
        .andWhere("a.tipopago='AR'")
        .andWhere('a.cia =:cia', {cia})
        .getRawOne();
        return (mirecargo);
    }


    async getOne(cia:number, id: number) : Promise<Movclis> {
        const Movclis = await this.movclisRepository.findOneBy({cia, id});
        if(!Movclis) throw new NotFoundException ('Movimiento Inexistente');
       return Movclis;
    }

    async editOne(id: number, dto: EditMovcliDto) {
        const Movclis = await this.movclisRepository.findOneBy({id});
        if(!Movclis) throw new NotFoundException ('Movimiento Inexistente');
        const editedMovclis = Object.assign(Movclis, dto);
        return await this.movclisRepository.update(id, editedMovclis);

    }

    async deleteOne(id: number) {
        const Movclis = await this.movclisRepository.findOneBy({id});
        if(!Movclis) throw new NotFoundException ('Movimiento Inexistente');
        return await this.movclisRepository.delete(id);

    }


    async importarManyMovclis(movclis: any[]) {
        let  movsagregados = [];
        let cia = 1;
        for(let mimov of movclis) { 
            let recobon = mimov.bonificacion;
            if(mimov.tipag == "AR") recobon = mimov.recargo;
            const dtomov = {
                idventa: mimov.idcli,
                fecha: mimov.fechamov,
                coa: mimov.coa,
                idconcepto: -1,
                idpoliza: -1,
                consecutivo: -1,
                tipopago: mimov.tipag,
                recobon: recobon,
                importe: mimov.importe,
                cobratario: mimov.oper,
                usuario:mimov.usuario,
                status: "A",
                idcobratario: mimov.idcobra,
                idusuario : mimov.idusuario,
                cia: cia,
                concepto: mimov.concep
            }
            // console.log("Importando ", dtomov);
            const nvomov = await this.importaOne(dtomov);
            movsagregados.push(nvomov);
        }
        return (movsagregados);
    }

    async createOne(dto: CreateMovclisDto) {
        const signosparam = '?,'.repeat(15) + '?';
        
        const agregamov = await this.movclisRepository
        .query( `CALL add_movcli(${signosparam})`,
          [ 
            dto.idventa,
            dto.fecha,
            dto.coa,
            dto.idconcepto,
            dto.idpoliza,
            dto.consecutivo,
            dto.tipopago,
            dto.recobon,
            dto.importe,
            dto.cobratario,
            dto.usuario,
            dto.status,
            dto.idcobratario,
            dto.idusuario,
            dto.cia,
            dto.concepto
          ]
        );
        return (agregamov)
    }

    async importaOne(dto: CreateMovclisDto) {
        const signosparam = '?,'.repeat(15) + '?';
        
        const agregamov = await this.movclisRepository
        .query( `CALL importa_movcli(${signosparam})`,
          [ 
            dto.idventa,
            dto.fecha,
            dto.coa,
            dto.idconcepto,
            dto.idpoliza,
            dto.consecutivo,
            dto.tipopago,
            dto.recobon,
            dto.importe,
            dto.cobratario,
            dto.usuario,
            dto.status,
            dto.idcobratario,
            dto.idusuario,
            dto.cia,
            dto.concepto
          ]
        );
        return (agregamov)
    }

}
