import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { FacturasService } from '../facturas/facturas.service';
import { RenfacService } from '../renfac/renfac.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ventas, Ubivtas } from './entities';
import { Usocfdi  } from 'src/usdocfdi/entities';
import { Metodopago } from 'src/metodopago/entities';
import { Clientes } from '../clientes/entities';
import { Facturas } from '../facturas/entities';
import { Renfac } from '../renfac/entities';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      Ventas, Clientes, Ubivtas, Facturas, Renfac, Usocfdi, Metodopago
    ])
  ],

  providers: [VentasService, FacturasService, RenfacService],
  controllers: [VentasController]
})
export class VentasModule {}
