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

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.facturasService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.facturasService.getOne(cia, id);
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

}
