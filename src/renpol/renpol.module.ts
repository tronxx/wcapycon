import { Module } from '@nestjs/common';
import { RenpolService } from './renpol.service';
import { RenpolController } from './renpol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renpol } from './entities';
import { Ventas } from '../ventas/entities';
import { Clientes } from '../clientes/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Renpol, Ventas, Clientes])
   ],
 
 
  providers: [RenpolService],
  controllers: [RenpolController]
})
export class RenpolModule {}
