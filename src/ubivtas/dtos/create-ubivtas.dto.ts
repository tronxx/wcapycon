import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateUbivtasDto {

    @IsString()
    codigo: string;

    @IsString()
    nombre: string;


    @IsString()
    zona: string;

    @IsString()
    status: string;

    @IsInt()
    cia: number;

}