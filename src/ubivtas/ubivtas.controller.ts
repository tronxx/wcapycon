import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UbivtasService } from './ubivtas.service';
import { CreateUbivtasDto, EditUbivtaDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('ubivtas')
@Controller('ubivtas')
export class UbivtasController {
    constructor (private readonly ubivtasService: UbivtasService) {}

    @ApiBearerAuth()
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.ubivtasService.getMany(cia);
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.ubivtasService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateUbivtasDto
    ) {
        return this.ubivtasService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditUbivtaDto
    ) {
        return this.ubivtasService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.ubivtasService.deleteOne(id);
    }


}
