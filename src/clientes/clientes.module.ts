import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Clientes, Nombres } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Clientes, Nombres])
  ],
  providers: [ClientesService],
  controllers: [ClientesController]
})
export class ClientesModule {}
