import { Module } from '@nestjs/common';
import { MovclisService } from './movclis.service';
import { MovclisController } from './movclis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movclis } from './entities';
import { Renfac } from '../renfac/entities';
import { RenfacService } from '../renfac/renfac.service'; // Import Renfac module to ensure entities are registered
import { Ventas } from '../ventas/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Movclis, Renfac, Ventas])
  ],

  providers: [MovclisService, RenfacService],
  controllers: [MovclisController]
})
export class MovclisModule {}
