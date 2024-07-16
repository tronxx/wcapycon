import { Module } from '@nestjs/common';
import { AvalesService } from './avales.service';
import { AvalesController } from './avales.controller';
import { Aval } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
     TypeOrmModule.forFeature([Aval])
  ],

  providers: [AvalesService],
  controllers: [AvalesController]
})
export class AvalesModule {}
