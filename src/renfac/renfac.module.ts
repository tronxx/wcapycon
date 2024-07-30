import { Module } from '@nestjs/common';
import { RenfacService } from './renfac.service';
import { RenfacController } from './renfac.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renfac } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Renfac])
  ],

  providers: [RenfacService],
  controllers: [RenfacController]
})
export class RenfacModule {}
