import { Module } from '@nestjs/common';
import { PolizasService } from './polizas.service';
import { PolizasController } from './polizas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polizas } from './entities';

@Module({
  imports:[
   TypeOrmModule.forFeature([Polizas])
  ],

  providers: [PolizasService],
  controllers: [PolizasController]
})
export class PolizasModule {}
