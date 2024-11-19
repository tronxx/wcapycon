import { Module } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { Solicitudes, Datosolicitud} from './entities'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Solicitudes, Datosolicitud])
  ],

  providers: [SolicitudesService],
  controllers: [SolicitudesController]
})
export class SolicitudesModule {}
