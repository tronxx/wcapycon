import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateRenfacDto } from "./create-renfac.dto";

export class EditRenfacDto extends PartialType(
    OmitType( CreateRenfacDto, ['conse'] as const)
) 
{}
