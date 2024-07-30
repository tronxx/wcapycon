import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateFacturasDto } from "./create-facturas.dto";

export class EditFacturaDto extends PartialType(
    OmitType( CreateFacturasDto, ['serie', 'numero'] as const)
) 
{}
