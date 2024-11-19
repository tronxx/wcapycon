import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateDatosolicitudDto } from "./create-datosolicitud.dto";

export class EditDatosolicitudDto extends PartialType(
    OmitType( CreateDatosolicitudDto, [] as const)
) 
{}