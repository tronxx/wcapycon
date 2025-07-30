import { Module } from '@nestjs/common';
import { SabanavtasService } from './sabanavtas.service';
import { SabanavtasController } from './sabanavtas.controller';
import { Sabanavtas, Sabanvtasren } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[
     TypeOrmModule.forFeature([
      Sabanavtas, Sabanvtasren
    ])
  ],

  providers: [SabanavtasService],
  controllers: [SabanavtasController]
})
export class SabanavtasModule {}
