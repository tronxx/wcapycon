import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Clientes, Nombres} from './entities';
import { Ciudades } from 'src/ciudades/entities';
import { CiudadesService } from 'src/ciudades/ciudades.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Clientes, Nombres, Ciudades])
  ],
  providers: [ClientesService, CiudadesService],
  controllers: [ClientesController]
})
export class ClientesModule {}
