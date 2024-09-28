import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facturas } from './entities';
import { Usocfdi } from '../usdocfdi/entities';
import { Metodopago } from '../metodopago/entities';


@Module({
  imports:[
    TypeOrmModule.forFeature([Facturas, Usocfdi, Metodopago])
  ],

  providers: [FacturasService],
  controllers: [FacturasController]
})
export class FacturasModule {}
