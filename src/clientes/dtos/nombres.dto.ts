import { IsInt, IsNumber, IsString } from "class-validator";

export class NombresDto {

    @IsString()
    appat: string;

    @IsString()
    apmat: string;

    @IsString()
    nombre1: string;

    @IsString()
    nombre2: string;

}