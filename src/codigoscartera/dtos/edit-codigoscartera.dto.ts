import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCodigoscarteraDto } from "./create-codigoscartera.dto";

export class EditCosigoscarteraDto extends PartialType(
    OmitType( CreateCodigoscarteraDto, ['codigo'] as const)
) 
{}
