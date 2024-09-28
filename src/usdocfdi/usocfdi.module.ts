import { Module } from '@nestjs/common';
import { UsocfdiService } from './usocfdi.service';
import { UsocfdiController  } from './usocfdi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usocfdi } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usocfdi])
  ],

  providers: [UsocfdiService],
  controllers: [UsocfdiController]
})
export class UsocfdiModule {}
