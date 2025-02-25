import { IsIn, IsInt, isNumber, IsNumber, IsString } from "class-validator";

export class CreateRenpolDto {
    @IsInt()
    idpoliza: number;

    @IsInt()
    idventa: number;

    @IsString()
    sino: string;

    @IsString()
    concepto: string;

    @IsString()
    ace: string;

    @IsString()
    tipo: string;

    @IsNumber()
    rob: number;

    @IsNumber()
    importe: number;

    @IsString()
    vence: string;

    @IsNumber()
    comision: number;

    @IsInt()
    dias: number;

    @IsString()
    tienda: string;

    @IsString()
    cobratario: string;

    @IsInt()
    letra: number;


    @IsInt()
    iduuid: number;

    @IsInt()
    idfactura: number;

    @IsInt()
    idusuario: number;

    @IsInt()
    cia: number;

}