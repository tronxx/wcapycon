import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MovclisService } from './movclis.service';
import { CreateMovclisDto, EditMovcliDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('movclis')
@Controller('movclis')
export class MovclisController {

    constructor (private readonly movclisService: MovclisService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.movclisService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.movclisService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateMovclisDto
    ) {
        return this.movclisService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditMovcliDto
    ) {
        return this.movclisService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.movclisService.deleteOne(id);
    }

}
