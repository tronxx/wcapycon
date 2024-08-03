import { IsInt, IsNumber, IsString } from "class-validator";

export class CreatePolizasDto {
    @IsString()
    tda: string;

    @IsString()
    fecha: string;

    @IsNumber()
    bonif: number;

    @IsNumber()
    recar: number;

    @IsNumber()
    importe: number;

    @IsInt()
    idtienda: number;

    @IsInt()
    idfactura: number;

    @IsString()
    status: string;

    @IsInt()
    cia: number;

}