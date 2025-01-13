import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovclisDto, EditMovcliDto } from './dtos';
import { Movclis } from './entities';
import { Conceptos } from 'src/conceptos/entities';

@Injectable()
export class MovclisService {

    constructor (
        @InjectRepository(Movclis)
        private readonly movclisRepository: Repository<Movclis>
    )
    {}

    async getMany(idventa: number, cia: number) :Promise <any[]>  {
        const mismovtos =  await this.movclisRepository
        .createQueryBuilder('a')
        .select('a.*')
        .addSelect ('b.concepto ')
        .addSelect(`(case coa when 'C' then importe else null end) as cargos`)
        .addSelect(`(case coa when 'A' then importe else null end) as abonos`)
        .addSelect(`(case tipopago when 'AB' then recobon else null end) as bonifica`)
        .addSelect(`(case tipopago when 'AR' then recobon else null end) as recargo`)
        .leftJoin(Conceptos, 'b', 'a.idconcepto = b.id')
        .where('a.idventa =:idventa',  {idventa})
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {fecha: 'ASC', consecutivo:'ASC'})
        .getRawMany();
        return (mismovtos);
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

    async xxcreateOne(dto: CreateMovclisDto) {
        const nvomovcli = this.movclisRepository.create(dto);
        return await this.movclisRepository.save(nvomovcli);
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
            const nvomov = await this.createOne(dtomov);
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

}
