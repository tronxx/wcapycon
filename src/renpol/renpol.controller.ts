
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RenpolService } from './renpol.service';
import { CreateRenpolDto, EditRenpolDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('renpol')
@Controller('renpol')
export class RenpolController {

    constructor (private readonly renpolService: RenpolService) {}

    @ApiBearerAuth()
    @Get(':cia/:idpoliza')
    async getMany(
        @Param('cia') cia: number,
        @Param('idpoliza') idpoliza: number
    ) {
        return await this.renpolService.getMany(idpoliza, cia);
    }

    @ApiBearerAuth()
    @Get(':cia/:idpoliza/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('idpoliza') idpoliza: number,
        @Param('id') id: number
    ) {
        return this.renpolService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async agregarenpol(
        @Body() dto: any
    ) {
        return this.renpolService.agregaRenpol(dto)
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditRenpolDto
    ) {
        return this.renpolService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.renpolService.deleteOne(id);
    }

    @ApiBearerAuth()
    @Post('/importar')
    async importarenpol(
        @Body() dto: any
    ) {
        return this.renpolService.importaRenpol(dto)
    }



}
