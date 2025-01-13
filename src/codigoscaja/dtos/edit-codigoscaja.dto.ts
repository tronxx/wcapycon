import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCodigoscajaDto } from "./create-codigoscaja.dto";

export class EditCosigoscajaDto extends PartialType(
    OmitType( CreateCodigoscajaDto, ['tda'] as const)
) 
{}
