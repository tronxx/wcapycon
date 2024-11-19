import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateSolicitudDto {

    @IsInt()
    idcliente: number;

    @IsInt()
    iddato: number;

    @IsInt()
    iddatosolicitud: number;

    @IsString()
    status: string;

    @IsInt()
    cia: number;
 
}