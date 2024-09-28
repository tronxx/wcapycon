import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {  MetodopagoService  } from './metodopago.service'
import { CreateMetodopagoDto, EditMetodopagoDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('metodopago')
@Controller('metodopago')
export class MetodopagoController {
    constructor (private readonly metodopagoService: MetodopagoService) {}

    @ApiBearerAuth()
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.metodopagoService.getMany(cia);
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.metodopagoService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateMetodopagoDto
    ) {
        return this.metodopagoService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditMetodopagoDto
    ) {
        return this.metodopagoService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.metodopagoService.deleteOne(id);
    }


}
