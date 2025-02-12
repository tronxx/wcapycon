import { Module } from '@nestjs/common';
import { CodigoscajaService } from './codigoscaja.service';
import { CodigoscajaController } from './codigoscaja.controller';
import { Codigoscaja, Codigosusuario } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
     TypeOrmModule.forFeature([
      Codigoscaja, Codigosusuario
    ])
  ],

  providers: [CodigoscajaService],
  controllers: [CodigoscajaController]
})
export class CodigoscajaModule {}
