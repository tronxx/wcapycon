import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateRenpolDto } from "./create-renpol.dto";

export class EditRenpolDto extends PartialType(
    OmitType( CreateRenpolDto, [] as const)
) 
{}
