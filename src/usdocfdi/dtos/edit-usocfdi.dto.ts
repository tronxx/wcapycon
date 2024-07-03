import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUsocfdiDto } from './create-usocfdi.dto';

export class EditUsocfdiDto extends PartialType(
    OmitType( CreateUsocfdiDto, ['clave'] as const)
) 
{}
