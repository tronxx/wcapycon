import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateMovclisDto } from "./create-movclis.dto";

export class EditMovcliDto extends PartialType(
    OmitType( CreateMovclisDto, ['cia'] as const)
) 
{}
