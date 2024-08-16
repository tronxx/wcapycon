import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {VentasService } from './ventas.service'
import { CreateVentasDto, EditVentaDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('ventas')
@Controller('ventas')
export class VentasController {

    constructor (private readonly ventasService:VentasService) {}

    @ApiBearerAuth()
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number,
        @Param('fechainicial') fechainicial : string,
        @Param('fechafinal') fechafinal : string,
        @Param('ubica') ubica : string,

    ) {
        return await this.ventasService.getMany(cia, fechainicial, fechafinal, ubica);
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.ventasService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Get(':cia/:id/:codigo')
    getOnebyCodigo(
        @Param('cia') cia: number,
        @Param('codigo') codigo: string
    ) {
        return this.ventasService.getOnebyCodigo(cia, codigo);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateVentasDto
    ) {
        return this.ventasService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditVentaDto
    ) {
        return this.ventasService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.ventasService.deleteOne(id);
    }

}
