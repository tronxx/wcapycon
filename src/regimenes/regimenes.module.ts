import { Module } from '@nestjs/common';
import { RegimenesService } from './regimenes.service';
import { RegimenesController } from './regimenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regimenes } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Regimenes])
  ],

  providers: [RegimenesService],
  controllers: [RegimenesController]
})

export class RegimenesModule {}
