import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { RenfacService } from '../renfac/renfac.service';
import { FacturasController } from './facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facturas } from './entities';
import { Renfac } from '../renfac/entities/renfac.entity';
import { Usocfdi } from '../usdocfdi/entities';
import { Metodopago } from '../metodopago/entities';
import { Datosolicitud, Solicitudes } from '../solicitudes/entities';
import { UsocfdiService } from '../usdocfdi/usocfdi.service';
import { MetodopagoService } from '../metodopago/metodopago.service';
import { SolicitudesService } from '../solicitudes/solicitudes.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([Facturas, Usocfdi, 
      Metodopago, Renfac, Datosolicitud, Solicitudes])
  ],

  providers: [FacturasService, RenfacService, 
    UsocfdiService, MetodopagoService, SolicitudesService],
  controllers: [FacturasController]
})
export class FacturasModule {}
