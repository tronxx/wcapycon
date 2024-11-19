import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateSolicitudDto } from "./create-solicitud.dto";

export class EditSolicitudDto extends PartialType(
    OmitType( CreateSolicitudDto, ['idcliente'] as const)
) 
{}
