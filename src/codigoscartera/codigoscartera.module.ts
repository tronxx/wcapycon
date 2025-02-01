import { Module } from '@nestjs/common';
import { CodigoscarteraService } from './codigoscartera.service';
import { CodigoscarteraController } from './codigoscartera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Codigoscartera } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Codigoscartera
   ])
 ],

  providers: [CodigoscarteraService],
  controllers: [CodigoscarteraController]
})
export class CodigoscarteraModule {}
