import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateSabanavtasrenDto } from './create-sabanavtaren.dto'

export class EditSabanavtarenDto extends PartialType(
    OmitType( CreateSabanavtasrenDto, [] as const)
) 
{}
