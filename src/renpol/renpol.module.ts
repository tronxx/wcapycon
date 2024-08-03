import { Module } from '@nestjs/common';
import { RenpolService } from './renpol.service';
import { RenpolController } from './renpol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renpol } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Renpol])
   ],
 
 
  providers: [RenpolService],
  controllers: [RenpolController]
})
export class RenpolModule {}
