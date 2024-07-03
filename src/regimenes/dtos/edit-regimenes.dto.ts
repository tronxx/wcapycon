import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateRegimenesDto } from './create-regimenes.dto';

export class EditRegimenesDto extends PartialType(
    OmitType( CreateRegimenesDto, ['clave'] as const)
) 
{}
