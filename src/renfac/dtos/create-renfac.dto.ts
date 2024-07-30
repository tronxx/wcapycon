import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateRenfacDto {
    @IsInt()
    idfactura: number;

    @IsInt()
    idventa: number;

    @IsInt()
    conse: number;

    @IsString()
    codigo: string;

    @IsString()
    descri: string;

    @IsString()
    serie: string;

    @IsInt()
    folio: number;

    @IsInt()
    canti: number;

    @IsNumber()
    preciou: number;

    @IsNumber()
    importe: number;

    @IsNumber()
    piva: number;

    @IsNumber()
    iva: number;

    @IsString()
    status: string;

    @IsInt()
    cia: number;

}