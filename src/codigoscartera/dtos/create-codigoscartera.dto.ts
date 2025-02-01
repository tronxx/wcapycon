import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateCodigoscarteraDto {
    @IsString()
    codigo: string;

    @IsString()
    nombre: string;

    @IsString()
    direc: string;

    @IsString()
    ciudad: string;

    @IsString()
    estado: string;

    @IsString()
    zona: string;

    @IsString()
    status: string;


   @IsInt()
    cia: number;
}