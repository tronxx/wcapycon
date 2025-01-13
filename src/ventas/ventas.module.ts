import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { FacturasService } from '../facturas/facturas.service';
import { RenfacService } from '../renfac/renfac.service';
import { ClientesService } from '../clientes/clientes.service';
import { PromotoresService } from '../promotores/promotores.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ventas, Ubivtas } from './entities';
import { Usocfdi  } from 'src/usdocfdi/entities';
import { Metodopago } from 'src/metodopago/entities';
import { Clientes, Nombres } from '../clientes/entities';
import { Facturas } from '../facturas/entities';
import { Renfac } from '../renfac/entities';
import { Vendedor } from '../vendedores/entities/index';
import { Promotor } from '../promotores/entities/promotores.entity';
import { UbivtasService } from '../ubivtas/ubivtas.service';
import { VendedoresService } from 'src/vendedores/vendedores.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Ventas, Clientes, Ubivtas, Facturas, Renfac, Usocfdi, 
      Metodopago, Nombres, Promotor, Vendedor,
    ])
  ],

  providers: [VentasService, FacturasService, UbivtasService,
    VendedoresService,
    RenfacService, PromotoresService, ClientesService],
  controllers: [VentasController]
})
export class VentasModule {}
