import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facturas } from './entities';


@Module({
  imports:[
    TypeOrmModule.forFeature([Facturas])
  ],

  providers: [FacturasService],
  controllers: [FacturasController]
})
export class FacturasModule {}
