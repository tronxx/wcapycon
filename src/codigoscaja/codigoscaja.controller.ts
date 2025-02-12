
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CodigoscajaService } from './codigoscaja.service';
import { CreateCodigoscajaDto, EditCosigoscajaDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('codigoscaja')
@Controller('codigoscaja')
export class CodigoscajaController {

    constructor (private readonly codigoscajaService: CodigoscajaService) {}

    @ApiBearerAuth()
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.codigoscajaService.getMany(cia);
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.codigoscajaService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Get('/codigosusuario/:cia/:idusuario')
    getCodigosCajaUsuario(
        @Param('cia') cia: number,
        @Param('idusuario') idusuario: number
    ) {
        return this.codigoscajaService.getCodigosCajaUsuario(cia, idusuario);
    }


    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateCodigoscajaDto
    ) {
        return this.codigoscajaService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditCosigoscajaDto
    ) {
        return this.codigoscajaService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.codigoscajaService.deleteOne(id);
    }


}
