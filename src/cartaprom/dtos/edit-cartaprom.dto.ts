import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCartapromDto } from "./create-cartaprom.dto";

export class EditCartapromDto extends PartialType(
    OmitType( CreateCartapromDto, ['codigo'] as const)
) 
{}
