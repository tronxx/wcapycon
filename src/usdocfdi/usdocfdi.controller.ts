import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsdocfdiService  } from './usdocfdi.service'
import { CreateUsocfdiDto, EditUsocfdiDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('usdocfdi')
@Controller('usdocfdi')
export class UsdocfdiController {
    constructor (private readonly usdocfdiService: UsdocfdiService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.usdocfdiService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.usdocfdiService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateUsocfdiDto
    ) {
        return this.usdocfdiService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditUsocfdiDto
    ) {
        return this.usdocfdiService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.usdocfdiService.deleteOne(id);
    }


}
