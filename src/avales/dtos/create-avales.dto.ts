import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateAvalesDto {

    @IsInt()
    id: number;

    @IsString()
    codigo: string;

    @IsString()
    nombre: string;

    @IsString()
    calle: string;

    @IsString()
    numpredio: string;

    @IsString()
    colonia: string;

    @IsString()
    telefono: string;

    @IsString()
    email: string;

    @IsString()
    codpostal: string;

    @IsInt()
    idciudad: number;

    @IsInt()
    idventa: number;

    @IsInt()
    idnombre: number;

    @IsInt()
    idregimen: number;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

    @IsString()
    rfc: string;

}