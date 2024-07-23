import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateConceptoDto } from './create-concepto.dto';

export class EditConceptoDto extends PartialType(
    OmitType( CreateConceptoDto, [] as const)
) 
{}
