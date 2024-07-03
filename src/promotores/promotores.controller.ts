import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PromotoresService  } from  './promotores.service';
import { CreatePromotorDto, EditPromotorDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('promotores')
@Controller('promotores')
export class PromotoresController {

    constructor (private readonly promotoresService: PromotoresService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.promotoresService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.promotoresService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreatePromotorDto
    ) {
        return this.promotoresService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPromotorDto
    ) {
        return this.promotoresService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.promotoresService.deleteOne(id);
    }

}
