import { Module } from '@nestjs/common';
import { PromotoresService } from './promotores.service';
import { PromotoresController } from './promotores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotor } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Promotor])
  ],

  providers: [PromotoresService],
  controllers: [PromotoresController]
})
export class PromotoresModule {}
