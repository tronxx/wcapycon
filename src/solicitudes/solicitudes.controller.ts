import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto, EditDatosolicitudDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('solcitudes')
@Controller('solicitudes')

export class SolicitudesController {

    constructor (private readonly solicitudesService: SolicitudesService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.solicitudesService.getMany(cia);
    }

    @ApiBearerAuth()
    @Get(':cia/:idcliente')
    getOne(
        @Param('cia') cia: number,
        @Param('idcliente') idcliente: number
    ) {
        return this.solicitudesService.getMany(idcliente);
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
