import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto, EditDatosolicitudDto, DatoClienteSolicitud } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';
import { Datosolicitud } from './entities';

@UseGuards(JwtAuthGuard)
@ApiTags('solcitudes')
@Controller('solicitudes')

export class SolicitudesController {

    constructor (private readonly solicitudesService: SolicitudesService) {}

    @Get(':cia')
    async getMany(
        @Param('idcliente') idcliente: number,
        @Param('tipo') tipo: number        
    ) {
        return await this.solicitudesService.getMany(idcliente, tipo);
    }

    @ApiBearerAuth()
    @Get(':cia/:idcliente/:tipo')
    getOne(
        @Param('cia') cia: number,
        @Param('idcliente') idcliente: number,
        @Param('tipo') tipo: number,        
    ) {
        return this.solicitudesService.getMany(idcliente, tipo);
    }

    @ApiBearerAuth()
    @Get('/datoespecifico/:cia/:idcliente/:iddato/:tipo')
    getDatoEspecifico(
        @Param('cia') cia: number,
        @Param('idcliente') idcliente: number,
        @Param('iddato') iddato: number,
        @Param('tipo') tipo: number

    ) {
        return this.solicitudesService.getDatoEspecifico(cia, idcliente, iddato, tipo);
    }

    @ApiBearerAuth()
    @Get('/letrasimpresas/:cia/:idcliente/:tipo')
    getLetrasImpresas(
        @Param('cia') cia: number,
        @Param('idcliente') idcliente: number,
        @Param('tipo') tipo: number,
    ) {
        return this.solicitudesService.getLetrasImpresas(cia, idcliente, tipo);
    }

    @ApiBearerAuth()
    @Get('/datosol/:cia/:idcliente/:tipo')
    getDatoSol(
        @Param('cia') cia: number,
        @Param('idcliente') idcliente: number,
        @Param('tipo') tipo: number,
        @Param('tipodato') tipodato: number,
    ) {
        return this.solicitudesService.getDatoSolicit(cia, idcliente, tipo, tipodato);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: any
    ) {
        console.log("Edtoy en post solicitudes", dto);
        return this.solicitudesService.createSolicitudCompleta(dto);
    }

    @ApiBearerAuth()
    @Post('/agregardato')
    async agregarDatoSolicitud(
        @Body() dto: DatoClienteSolicitud
    ) {
        // console.log("Edtoy en post solicitudes", dto);
        return this.solicitudesService.crearDatoSolicitud(dto);
    }

    @ApiBearerAuth()
    @Post('/grabarletrasimpresas')
    async grabarLetrasImpresas(
        @Body() dto: any
    ) {
        //console.log("Edtoy en post solicitudes/grabarletrasimpresas", dto);
        return this.solicitudesService.grabarLetrasImpresas(dto);
    }

    @ApiBearerAuth()
    @Post('/grabardatosolicitud')
    async grabarDatoSolicitud(
        @Body() dto: any
    ) {
        //console.log("Edtoy en post solicitudes/grabarletrasimpresas", dto);
        return this.solicitudesService.grabarDatoSolicitud(dto);
    }

    @ApiBearerAuth()
    @Post('/importar')
    async importarSolicitdCompleta(
        @Body() dto: any
    ) {
        // console.log("Edtoy en post solicitudes", dto);
        return this.solicitudesService.importarSolicitudCompleta(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: any
    ) {
        return this.solicitudesService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.solicitudesService.deleteOne(id);
    }


}
