import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreatePromotorDto } from "./create-promotor.dto";

export class EditPromotorDto extends PartialType(
    OmitType( CreatePromotorDto, ['codigo'] as const)
) 
{}
