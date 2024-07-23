import { Module } from '@nestjs/common';
import { MovclisService } from './movclis.service';
import { MovclisController } from './movclis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movclis } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Movclis])
  ],

  providers: [MovclisService],
  controllers: [MovclisController]
})
export class MovclisModule {}
