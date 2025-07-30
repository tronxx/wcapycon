import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateSabanavtasDto  } from "./create-sabanavtas.dto";

export class EditSabanavtasDto extends PartialType(
    OmitType( CreateSabanavtasDto, [] as const)
) 
{}
