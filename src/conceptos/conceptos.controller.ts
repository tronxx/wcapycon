import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConceptosService } from './conceptos.service';
import { EditConceptoDto, CreateConceptoDto } from './dtos';
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('conceptos')
@Controller('conceptos')
export class ConceptosController {
    constructor (private readonly conceptosService: ConceptosService) {}

    @Get(':concepto')
    async getMany(
        @Param('concepto') concepto: string
    ) {
        return await this.conceptosService.getMany(concepto);
    }

    @Get(':concepto/:id')
    getOne(
        @Param('concepto') concepto: string,
        @Param('id') id: number
    ) {
        return this.conceptosService.getOne(concepto, id);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateConceptoDto
    ) {
        return this.conceptosService.createOne(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditConceptoDto
    ) {
        return this.conceptosService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.conceptosService.deleteOne(id);
    }


}
