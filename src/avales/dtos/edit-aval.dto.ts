import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateAvalDto } from "./create-aval.dto";

export class EditAvalDto extends PartialType(
    OmitType( CreateAvalDto, ['idnombre'] as const)
) 
{}
