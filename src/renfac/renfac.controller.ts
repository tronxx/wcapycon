import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RenfacService } from './renfac.service';
import { CreateRenfacDto, EditRenfacDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('renfac')
@Controller('renfac')
export class RenfacController {

    constructor (private readonly renfacService: RenfacService) {}

    @ApiBearerAuth()
    @Get(':idfactura')
    async getMany(
        @Param('idfactura') idfactura: number
    ) {
        return await this.renfacService.getMany(idfactura);
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.renfacService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateRenfacDto
    ) {
        return this.renfacService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditRenfacDto
    ) {
        return this.renfacService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.renfacService.deleteOne(id);
    }

}
