import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CodigoscarteraService } from './codigoscartera.service';
import { CreateCodigoscarteraDto, EditCosigoscarteraDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('codigoscartera')
@Controller('codigoscartera')
export class CodigoscarteraController {
    constructor (private readonly codigoscarteraService: CodigoscarteraService) {}

    @ApiBearerAuth()
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.codigoscarteraService.getMany(cia);
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.codigoscarteraService.getOne(cia, id);
    }


    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateCodigoscarteraDto
    ) {
        return this.codigoscarteraService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditCosigoscarteraDto
    ) {
        return this.codigoscarteraService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.codigoscarteraService.deleteOne(id);
    }

}
