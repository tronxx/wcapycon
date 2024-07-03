import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateUsocfdiDto {

    @IsString()
    clave: string;

    @IsString()
    nombre: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}
