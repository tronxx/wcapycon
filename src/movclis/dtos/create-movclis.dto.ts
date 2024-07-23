import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateMovclisDto {
    @IsInt()
    idventa: number;

    @IsString()
    fecha: string;

    @IsString()
    coa: string;

    @IsInt()
    idconcepto: number;

    @IsInt()
    idpoliza: number;

    @IsInt()
    consecutivo: number;

    @IsString()
    tipopago: string;

    @IsNumber()
    recobon: number;

    @IsNumber()
    importe: number;

    @IsString()
    cobratario: string;

    @IsString()
    usuario: string;

    @IsString()
    status: string;

    @IsInt()
    idcobratario: number;

    @IsInt()
    idusuario: number;

    @IsInt()
    cia: number;

    @IsString()
    concepto: string;

}

