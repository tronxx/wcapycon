import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientesService } from './clientes.service'
import { NombresDto, CreateClientesDto, EditClienteDto, } from './dtos'
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

    @Get('codigo/:cia/:codigo')
    getOneByCodigo(
        @Param('cia') cia: number,
        @Param('codigo') codigo: string
    ) {
        return this.clientesService.getOnebyCodigo(cia, codigo);
    }

    @ApiBearerAuth()
    @Get(':cia/:id/:codigo')
    getOnebyCodigo(
        @Param('cia') cia: number,
        @Param('id') id: number,
        @Param('codigo') codigo: string
    ) {
        return this.clientesService.getOnebyCodigo(cia, codigo);
    }


    @ApiBearerAuth()
    @Get(':cia/:id/:codigo/:nombre')
    getManyByNombre(
        @Param('cia') cia: number,
        @Param('id') id: number,
        @Param('codigo') codigo: string,
        @Param('nombre') nombre: string,
    ) {
        return this.clientesService.getManybyNombre(cia, nombre);
    }

    @ApiBearerAuth()
    @Get(':cia/id/nombre/codigo/:id')
    getNombre(
        @Param('cia') cia: number,
        @Param('id') id: number,
    ) {
        return this.clientesService.getNombre(id);
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
        @Body() dto: any
    ) {
        return this.clientesService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.clientesService.deleteOne(id);
    }


}
