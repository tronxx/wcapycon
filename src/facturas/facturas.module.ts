import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { RenfacService } from '../renfac/renfac.service';
import { FacturasController } from './facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facturas } from './entities';
import { Renfac } from '../renfac/entities/renfac.entity';
import { Usocfdi } from '../usdocfdi/entities';
import { Metodopago } from '../metodopago/entities';


@Module({
  imports:[
    TypeOrmModule.forFeature([Facturas, Usocfdi, Metodopago, Renfac])
  ],

  providers: [FacturasService, RenfacService],
  controllers: [FacturasController]
})
export class FacturasModule {}
