import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
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
        @Query('modo') modo: string,
        @Query('fechainicial') fechainicial: string,
        @Query('fechafinal') fechafinal: string,
        @Query('ubica') ubica: string,

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
    @Get('/busqueda/sigteanterior/:cia/:codigo/:haciadonde')
    getSigteAnterbyCodigo(
        @Param('cia') cia: number,
        @Param('codigo') codigo: string,
        @Param('haciadonde') haciadonde: string,
    ) {
        //console.log("Buscando venta siguiente o anterior por codigo", cia, codigo, haciadonde);
        return this.ventasService.getSigteAnterbyCodigo(cia, codigo, haciadonde);
    }


    @ApiBearerAuth()
    @Get('/busqueda/nombre/:cia/:nombre')
    getVentaByNombre(
        @Param('cia') cia: number,
        @Param('nombre') nombre: string,
    ) {

        //console.log("Buscando venta por nombre", cia, nombre);
        return this.ventasService.getManybyNombre(cia, nombre);
    }


    @ApiBearerAuth()
    @Get('/busqueda/idcliente/:cia/:idcliente')
    getManyByidCliente(
        @Param('cia') cia: number,
        @Param('idcliente') idcliente: number
    ) {
        //console.log("Buscando ventas por idcliente", cia, idcliente);
        return this.ventasService.getManybyIdCli(cia, idcliente);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateVentasDto
    ) {
        return this.ventasService.createOne(dto);
    }

    @ApiBearerAuth()
    @Post('/ventacompleta')
    async createNuevaVentacompleta(
        @Body() venta: any
    ) {
        //console.log("Creando venta nueva", venta);
        return this.ventasService.createVenta(venta);
    }

    @ApiBearerAuth()
    @Post('/importar')
    async importar(
        @Body() dto: any[]
    ) {
        return this.ventasService.importarManyVenytas(dto);
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
