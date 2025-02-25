import { IsInt, IsNumber, IsString } from "class-validator";

export class DatoClienteSolicitud {

    @IsInt()
    idcli: number;

    @IsInt()
    datosol: number;

    @IsString()
    concepto: string;

    @IsInt()
    cia: number;
 
}