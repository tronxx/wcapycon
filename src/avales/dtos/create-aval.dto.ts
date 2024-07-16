import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateAvalDto  {

    @IsString()
    nombre: string;

    @IsInt()
    idnombre: number;

    @IsString()
    direc: string;

    @IsString()
    telefono: string;

    @IsString()
    ciudad: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}