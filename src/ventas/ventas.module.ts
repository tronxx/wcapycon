import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ventas } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Ventas])
  ],

  providers: [VentasService],
  controllers: [VentasController]
})
export class VentasModule {}
