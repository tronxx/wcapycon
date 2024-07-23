import { Module } from '@nestjs/common';
import { ConceptosService } from './conceptos.service';
import { ConceptosController } from './conceptos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conceptos } from './entities';

@Module({

  imports:[
    TypeOrmModule.forFeature([Conceptos])
  ],

  providers: [ConceptosService],
  controllers: [ConceptosController]
})
export class ConceptosModule {}
