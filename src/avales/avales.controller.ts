import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {  AvalesService  } from './avales.service'
import { CreateAvalDto, EditAvalDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('avales')
@Controller('avales')
export class AvalesController {
    constructor (private readonly avalesService: AvalesService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.avalesService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.avalesService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateAvalDto
    ) {
        return this.avalesService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditAvalDto
    ) {
        return this.avalesService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.avalesService.deleteOne(id);
    }


}
