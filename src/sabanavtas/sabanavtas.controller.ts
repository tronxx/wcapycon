import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';


import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SabanavtasService } from './sabanavtas.service';
import {  CreateSabanavtasDto, CreateSabanavtasrenDto, EditSabanavtarenDto, EditSabanavtasDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('sabanavtas')
@Controller('sabanavtas')
export class SabanavtasController {

    constructor (private readonly sabanavtasService: SabanavtasService) {}

    @ApiBearerAuth()
    @Get('/sabana/:cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.sabanavtasService.getMany(cia);
    }

    @ApiBearerAuth()
    @Get('/rensabana/:cia/:idsabana')
    async getCompra(
        @Param('cia') cia: number,
        @Param('idsabana') idsabana: number
    ) {
        return await this.sabanavtasService.getRenSabanaMany(cia, idsabana);
    }

    @ApiBearerAuth()
    @Get('/sabana/:cia/:id')
    async getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return await this.sabanavtasService.getOneSabana(cia, id);
    }

    @ApiBearerAuth()
    @Post('/sabana')
    async createOneSabana(
        @Body() dto: CreateSabanavtasDto
    ) {
        return await this.sabanavtasService.craeteOneSabana(dto);
    }

    @ApiBearerAuth()
    @Delete('/rensabana/:cia/:idsabana/:id')
    async delRensabana(
        @Param('cia') cia: number,
        @Param('idsabana') idsabana: number,
        @Param('id') id: number
    ) {
        return await this.sabanavtasService.delRensabana(cia, idsabana);
    }

    @ApiBearerAuth()
    @Delete('/sabana/cia:/:id')
    async delSabana(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return await this.sabanavtasService.delSabana(cia, id);
    }

}
