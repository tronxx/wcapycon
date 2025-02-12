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
import { Datosolicitud, Solicitudes } from '../solicitudes/entities';
import { Regimenes } from '../regimenes/entities';
import { Ciudades } from '../ciudades/entities';

import { UbivtasService } from '../ubivtas/ubivtas.service';
import { VendedoresService } from '../vendedores/vendedores.service';
import { SolicitudesService } from '../solicitudes/solicitudes.service';
import { UsocfdiService } from '../usdocfdi/usocfdi.service';
import { MetodopagoService } from '../metodopago/metodopago.service';
import { Cartaprom } from '../cartaprom/entities';
import { CartapromService } from '../cartaprom/cartaprom.service';
import { RegimenesService } from '../regimenes/regimenes.service'
import { CiudadesService } from '../ciudades/ciudades.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Ventas, Clientes, Ubivtas, Facturas, Renfac, Usocfdi, 
      Metodopago, Nombres, Promotor, Vendedor, Datosolicitud,
      Cartaprom, Solicitudes, Regimenes, Ciudades,
    ])
  ],

  providers: [VentasService, FacturasService, UbivtasService,
    VendedoresService, SolicitudesService, UsocfdiService,
    CartapromService, RegimenesService, CiudadesService,
    RenfacService, PromotoresService, ClientesService, MetodopagoService],
  controllers: [VentasController]
})
export class VentasModule {}
