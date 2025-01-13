import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateCodigoscajaDto {
    @IsString()
    tda: string;

    @IsString()
    nombre: string;

    @IsString()
    direc: string;

    @IsString()
    ciudad: string;

    @IsString()
    estado: string;

    @IsString()
    status: string;

    @IsString()
    seriebon: string;

    @IsString()
    serierec: string;

    @IsString()
    seriefac: string;

    @IsString()
    serieen: string;

    @IsString()
    seriepol: string;

   @IsInt()
    cia: number;
}