import { Module } from '@nestjs/common';
import { CodigoscajaService } from './codigoscaja.service';
import { CodigoscajaController } from './codigoscaja.controller';
import { Codigoscaja } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
     TypeOrmModule.forFeature([
      Codigoscaja
    ])
  ],

  providers: [CodigoscajaService],
  controllers: [CodigoscajaController]
})
export class CodigoscajaModule {}
