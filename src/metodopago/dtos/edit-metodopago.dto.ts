import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateMetodopagoDto } from './create-metodopago.dto';

export class EditMetodopagoDto extends PartialType(
    OmitType( CreateMetodopagoDto, ['clave'] as const)
) 
{}
