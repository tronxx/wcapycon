import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUbivtasDto } from "./create-ubivtas.dto";

export class EditUbivtaDto extends PartialType(
    OmitType( CreateUbivtasDto, ['codigo'] as const)
) 
{}
