import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { NombresDto, CreateClientesDto, EditClienteDto } from './dtos';
import { Clientes, Nombres } from './entities';
import { CiudadesService } from '../ciudades/ciudades.service';
import { Ciudades } from '../ciudades/entities';

@Injectable()
export class ClientesService {

    constructor (
        @InjectRepository(Clientes)
        private readonly clientesRepository: Repository<Clientes>,
        @InjectRepository(Nombres)
        private readonly nombresRepository: Repository<Nombres>,
        @InjectRepository(Ciudades)
        private readonly ciudadesRepository: Repository<Ciudades>,
        private ciudadesService: CiudadesService,
    )
    {}

    async getMany(cia: number) :Promise <Clientes[]>  {
        return await this.clientesRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Clientes> {
        const Cliente = await this.clientesRepository.findOneBy({cia, id});
        if(!Cliente) throw new NotFoundException ('Cliente Inexistente');
       return Cliente;
    }

    async getOnebyCodigo(cia:number, codigo: string) : Promise<Clientes> {
        const Cliente = await this.clientesRepository.findOneBy({cia, codigo});
        //console.log("Buscando al cliente", codigo, Cliente);
        //if(!Cliente) throw new NotFoundException ('Cliente Inexistente');
       return Cliente;
    }

    async editOneRfc(id: number, dto: EditClienteDto) {
        const Cliente = await this.clientesRepository.findOneBy({id});
        if(!Cliente) throw new NotFoundException ('Cliente Inexistente');
        const editedCliente = Object.assign(Cliente, dto);
        return await this.clientesRepository.update(id, editedCliente);

    }


    async editOne(id: number, dto: any) {
        const Cliente = await this.clientesRepository.findOneBy({id});
        if(!Cliente) throw new NotFoundException ('Cliente Inexistente');
        let codigo = dto.codigo;
        let cia = dto.cia;

        let nombres = new NombresDto;
        nombres.appat = dto.appat;
        nombres.apmat = dto.apmat;
        nombres.nombre1 = dto.nombre1;
        nombres.nombre2 = dto.nombre2
        
        const nvonombre = await this.createNombres(nombres);
        //console.log("Nvonombre", JSON.stringify(nvonombre) );
        const idnombre = nvonombre[0][0].id;
        const nombrecompleto = await this.nombrecompleto(nombres);

        let dtocliente = new EditClienteDto;
        dtocliente.nombre = nombrecompleto;
        dtocliente.calle = dto.calle;
        dtocliente.numpredio = dto.numpredio;
        dtocliente.colonia = dto.colonia;
        dtocliente.telefono = dto.telefono;
        dtocliente.email = dto.email;
        dtocliente.codpostal = dto.codpostal;
        dtocliente.idciudad = dto.idciudad;
        dtocliente.idregimen = dto.idregimen;
        dtocliente.cia = dto.cia;
        dtocliente.idnombre = idnombre;
        dtocliente.rfc = dto.rfc;
        const editedCliente = Object.assign(Cliente, dtocliente);
        return await this.clientesRepository.update(id, editedCliente);

    }

    async deleteOne(id: number) {
        const Cliente = await this.clientesRepository.findOneBy({id});
        if(!Cliente) throw new NotFoundException ('Cliente Inexistente');
        return await this.clientesRepository.delete(id);

    }

    async createOne(dto: any) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xCliente = await this.clientesRepository.findOneBy({codigo, cia});
        if(xCliente) {
            throw new NotAcceptableException ('Ya existe ese Cliente');
            return;
        }
        let nombres = new NombresDto;
        nombres.appat = dto.appat;
        nombres.apmat = dto.apmat;
        nombres.nombre1 = dto.nombre1;
        nombres.nombre2 = dto.nombre2
        
        const nvonombre = await this.createNombres(nombres);
        //console.log("Nvonombre", JSON.stringify(nvonombre) );
        const idnombre = nvonombre[0][0].id;
        const nombrecompleto = await this.nombrecompleto(nombres);

        let dtocliente = new CreateClientesDto;
        dtocliente.nombre = nombrecompleto;
        dtocliente.id = dto.id;
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
        dtocliente.idnombre = idnombre;
        dtocliente.rfc = dto.rfc;
        const Cliente = this.clientesRepository.create(dtocliente);
        return await this.clientesRepository.save(Cliente);

    }

    async createNombres(dto: NombresDto) {
        const signosparam = '?,'.repeat(3) + '?';
        
        const nvonombre = await this.nombresRepository
        .query( `CALL busca_nombre(${signosparam})`,
          [ 
            dto.appat,
            dto.apmat,
            dto.nombre1,
            dto.nombre2
          ]
        );
        return (nvonombre)

    }

    async nombrecompleto(nomcompleto: NombresDto) {
        const apellidos = (nomcompleto.appat + " "+ nomcompleto.apmat).trim();
        const nombres = (nomcompleto.nombre1 + " " + nomcompleto.nombre2 ).trim();
        const nomcomp = ( apellidos + " " + nombres ).trim();
        return nomcomp;
    }
    
    async getNombre(id: number) {
        return await this.nombresRepository.findOneBy({id});
    }
    
    async getManybyNombre(cia: number, nombre:string) :Promise <Clientes[]>  {
        return await this.clientesRepository.createQueryBuilder('clientes')
        .where('clientes.nombre LIKE :nombre', { nombre: `%${nombre}%` })
        .andWhere('clientes.cia = :cia', { cia })
        .orderBy('clientes.nombre', 'ASC')
        .addOrderBy('clientes.codigo', 'ASC')
        .getMany();        
    }

}
