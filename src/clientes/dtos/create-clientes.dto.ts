import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateClientesDto {

    @IsString()
    codigo: string;

    @IsString()
    nombre: string;

    @IsString()
    direc: string;

    @IsString()
    telefono: string;

    @IsString()
    email: string;

    @IsString()
    codpostal: string;

    
    @IsString()
    idciudad: number;

    @IsString()
    idnombre: number;

    @IsInt()
    idregimen: number;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}