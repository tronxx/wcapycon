import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateDatosolicitudDto {

    @IsString()
    concepto: string;

    @IsInt()
    cia: number;
 
}