import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateCartapromDto {

    @IsString()
    codigo: string;

    @IsString()
    nombre: string;

    @IsString()
    acum1: string;

    @IsString()
    oferta: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}