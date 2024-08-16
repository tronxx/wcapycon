import { Module } from '@nestjs/common';
import { UbivtasService } from './ubivtas.service';
import { UbivtasController } from './ubivtas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubivtas } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Ubivtas])
  ],

  providers: [UbivtasService],
  controllers: [UbivtasController]
})
export class UbivtasModule {}
