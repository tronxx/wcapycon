import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreatePolizasDto } from "./create-polizas.dto";

export class EditPolizaDto extends PartialType(
    OmitType( CreatePolizasDto, ['tda'] as const)
) 
{}
