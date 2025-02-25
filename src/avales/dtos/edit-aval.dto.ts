import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateAvalesDto } from "./create-avales.dto";

export class EditAvalDto extends PartialType(
    OmitType( CreateAvalesDto, ['id'] as const)
) 
{}
