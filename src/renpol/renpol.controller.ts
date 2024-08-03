
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

    @Get(':idpoliza')
    async getMany(
        @Param('idpoliza') idpoliza: number
    ) {
        return await this.renpolService.getMany(idpoliza);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.renpolService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateRenpolDto
    ) {
        return this.renpolService.createOne(dto);
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

}
