
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PolizasService } from './polizas.service';
import { CreatePolizasDto, EditPolizaDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('polizas')
@Controller('polizas')
export class PolizasController {

    constructor (private readonly polizasService: PolizasService) {}

    @ApiBearerAuth()
    @Get(':idtienda')
    async getMany(
        @Param('idtienda') idtienda: number
    ) {
        return await this.polizasService.getMany(idtienda);
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.polizasService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Get(':cia/:id/:fechaini/:fechafin/:idtienda')
    getManyByFecha(
        @Param('cia') cia: number,
        @Param('id') id: number,
        @Param('fechaini') fechaini: string,
        @Param('fechafin') fechafin: string,
        @Param('idtienda') idtienda: number,
    ) {
        return this.polizasService.getManyByFecha(cia, idtienda, fechaini, fechafin);
    }



    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreatePolizasDto
    ) {
        return this.polizasService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPolizaDto
    ) {
        return this.polizasService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.polizasService.deleteOne(id);
    }

}
