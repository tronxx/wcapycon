import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ventas, Ubivtas } from './entities';
import { Clientes } from '../clientes/entities';
import { Facturas } from '../facturas/entities';


@Module({
  imports:[
    TypeOrmModule.forFeature([Ventas, Clientes, Ubivtas, Facturas])
  ],

  providers: [VentasService],
  controllers: [VentasController]
})
export class VentasModule {}
