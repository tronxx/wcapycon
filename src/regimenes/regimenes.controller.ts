import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegimenesService } from './regimenes.service'
import { CreateRegimenesDto, EditRegimenesDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('regimenes')
@Controller('regimenes')
export class RegimenesController {
    constructor (private readonly regimenesService: RegimenesService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.regimenesService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.regimenesService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateRegimenesDto
    ) {
        return this.regimenesService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditRegimenesDto
    ) {
        return this.regimenesService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.regimenesService.deleteOne(id);
    }


}
