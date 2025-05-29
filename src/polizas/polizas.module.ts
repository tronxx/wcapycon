import { Module } from '@nestjs/common';
import { PolizasService } from './polizas.service';
import { PolizasController } from './polizas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polizas, Car_anuscartera, Car_corlarpzo, Car_corlarpzodet } from './entities';
import { Codigoscaja} from '../codigoscaja/entities';
import { Codigoscartera } from '../codigoscartera/entities';
import { Renpol } from '../renpol/entities';
import { Ventas } from '../ventas/entities';


@Module({
  imports:[
     TypeOrmModule.forFeature([Polizas, Codigoscaja, Car_anuscartera, 
      Car_corlarpzo, Car_corlarpzodet, Codigoscartera, Renpol, Ventas])
  ],

  providers: [PolizasService],
  controllers: [PolizasController]
})
export class PolizasModule {}
