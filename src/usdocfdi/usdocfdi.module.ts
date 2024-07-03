import { Module } from '@nestjs/common';
import { UsdocfdiService } from './usdocfdi.service';
import { UsdocfdiController  } from './usdocfdi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usocfdi } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usocfdi])
  ],

  providers: [UsdocfdiService],
  controllers: [UsdocfdiController]
})
export class UsdocfdiModule {}
