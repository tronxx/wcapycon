import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FacturasService } from './facturas.service';
import {  CreateFacturasDto, EditFacturaDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('facturas')
@Controller('facturas')
export class FacturasController {

    constructor (private readonly facturasService: FacturasService) {}

    @ApiBearerAuth()
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.facturasService.getMany(cia);
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.facturasService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Get(':cia/:numero/:serie/:modo')
    getLastNum(
        @Param('cia') cia: number,
        @Param('numero') numero: number,
        @Param('serie') serie: string,
        @Param('modo') modo: string,
    ) {
        if(modo == "ULTIMO_FOLIO") return this.facturasService.getLastNum (cia, numero, serie);
        if(modo == "BUSQUEDA_SERIE_NUMERO") return this.facturasService.getOnebyCodigo (cia, numero, serie);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateFacturasDto
    ) {
        return this.facturasService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditFacturaDto
    ) {
        return this.facturasService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.facturasService.deleteOne(id);
    }

    @ApiBearerAuth()
    @Post('/importar')
    async importar(
        @Body() dto: any[]
    ) {
        return this.facturasService.importarManyFacturas(dto);
    }



}
