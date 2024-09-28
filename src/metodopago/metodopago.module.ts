import { Module } from '@nestjs/common';
import { MetodopagoService } from './metodopago.service';
import { MetodopagoController } from './metodopago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metodopago } from './entities';

@Module({
  imports:[
     TypeOrmModule.forFeature([Metodopago])
  ],

  providers: [MetodopagoService],
  controllers: [MetodopagoController]
})
export class MetodopagoModule {}
