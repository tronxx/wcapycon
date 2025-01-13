import { Module } from '@nestjs/common';
import { PolizasService } from './polizas.service';
import { PolizasController } from './polizas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polizas } from './entities';
import { Codigoscaja} from '../codigoscaja/entities';

@Module({
  imports:[
     TypeOrmModule.forFeature([Polizas, Codigoscaja])
  ],

  providers: [PolizasService],
  controllers: [PolizasController]
})
export class PolizasModule {}
