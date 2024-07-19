import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateVentasDto } from "./create-ventas.dto";

export class EditVentaDto extends PartialType(
    OmitType( CreateVentasDto, ['codigo'] as const)
) 
{}
