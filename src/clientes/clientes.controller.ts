import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientesService } from './clientes.service'
import { NombresDto, CreateClientesDto, EditClienteDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
    constructor (private readonly clientesService: ClientesService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.clientesService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.clientesService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: any
    ) {
        return this.clientesService.createOne(dto);
    }

    @ApiBearerAuth()
    @Post(':nombres')
    async buscarNombre(
        @Param('nombres') nombres: string,
        @Body() dto: NombresDto
    ) {
        return this.clientesService.createNombres(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditClienteDto
    ) {
        return this.clientesService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.clientesService.deleteOne(id);
    }


}
