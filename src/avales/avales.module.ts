import { Module } from '@nestjs/common';
import { AvalesService } from './avales.service';
import { AvalesController } from './avales.controller';
import { Avales } from './entities';
import { Ciudades } from '../ciudades/entities/ciudades.entity';
import { CiudadesService } from '../ciudades/ciudades.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
     TypeOrmModule.forFeature([Avales, Ciudades])
  ],

  providers: [AvalesService, CiudadesService],
  controllers: [AvalesController]
})
export class AvalesModule {}
