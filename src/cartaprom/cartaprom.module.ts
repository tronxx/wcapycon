import { Module } from '@nestjs/common';
import { CartapromService } from './cartaprom.service';
import { CartapromController } from './cartaprom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartaprom } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cartaprom])
  ],

  providers: [CartapromService],
  controllers: [CartapromController]
})
export class CartapromModule {}
