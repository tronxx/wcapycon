import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateFacturasDto {
    @IsString()
    serie: string;

    @IsInt()
    numero: number;

    @IsInt()
    idventa: number;

    @IsString()
    fecha: string;

    @IsInt()
    iduuid: number;

    @IsInt()
    idusocfdi: number;

    @IsInt()
    idmetodopago: number;

    @IsNumber()
    importe: number;

    @IsNumber()
    iva: number;

    @IsNumber()
    total: number;

    @IsString()
    status: string;

    @IsInt()
    cia: number;

}